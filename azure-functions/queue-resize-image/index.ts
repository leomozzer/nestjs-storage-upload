import { AzureFunction, Context } from "@azure/functions"
import { BlockBlobClient, BlobServiceClient } from "@azure/storage-blob"
import { TableClient, odata } from "@azure/data-tables"
import * as Jimp from "jimp"
import * as stream from "stream"

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

function getBlobClient(blob: string): BlockBlobClient {
    try {
        const blobClientService = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
        const containerClient = blobClientService.getContainerClient(process.env.AzureContainer);
        const blobClient = containerClient.getBlockBlobClient(blob);
        return blobClient;
    } catch (error) {
        return error;
    }
}

function getTableClient() {
    try {
        const tableClient = TableClient.fromConnectionString(process.env.AzureWebJobsStorage, process.env.AzureLogTable)
        return tableClient;
    } catch (error) {
        console.log("!!!!!!!!!!!!!")
        console.log(error)
        throw error
    }
}

async function ReadEntities(partitionKey: string) {
    try {
        const tableClient = getTableClient();
        const listEntities = tableClient.listEntities({
            queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
        })
        const iterator = listEntities.byPage({ maxPageSize: 50 })
        let entities = []
        for await (const page of iterator) {
            entities = page;
            break
        }
        return entities;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const queueTrigger: AzureFunction = async function (context: Context, myQueueItem: string): Promise<void> {
    const blobClient = getBlobClient(`original/${myQueueItem}`)
    const tableClient = getTableClient();
    const blob = await blobClient.downloadToBuffer()
    let thumbnail = await Jimp.read(blob);
    thumbnail.resize(100, Jimp.AUTO);
    thumbnail.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
        const readStream = new stream.PassThrough();
        readStream.end(buffer);
        const blobResized = new BlockBlobClient(process.env.AzureWebJobsStorage, process.env.AzureContainer, `resized/${myQueueItem}`);
        try {
            await blobResized.uploadStream(readStream,
                uploadOptions.bufferSize,
                uploadOptions.maxBuffers,
                { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
            const entities = await ReadEntities('resized')
            await tableClient.createEntity({
                partitionKey: "resized",
                rowKey: String(entities.length + 1),
                fileName: myQueueItem
            })
        } catch (err) {
            context.log("error")
            context.log(err.message);
            const entities = await ReadEntities('error')
            await tableClient.createEntity({
                partitionKey: "error",
                rowKey: String(entities.length + 1),
                message: err.message
            })
        }
    })
    context.log('Queue trigger function processed work item', myQueueItem);
};

export default queueTrigger;
