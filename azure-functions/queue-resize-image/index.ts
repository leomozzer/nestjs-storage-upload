import { AzureFunction, Context } from "@azure/functions"
import {BlockBlobClient, BlobServiceClient} from "@azure/storage-blob"
import * as Jimp from "jimp"
import * as stream from "stream"

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const queueTrigger: AzureFunction = async function (context: Context, myQueueItem: string): Promise<void> {
    const blobClientService = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    const containerClient = blobClientService.getContainerClient(process.env.AzureContainer);
    const blobClient = containerClient.getBlockBlobClient(`original/${myQueueItem}`);
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
        } catch (err) {
            context.log("error")
            context.log(err.message);
        }
    })
    context.log('Queue trigger function processed work item', myQueueItem);
};

export default queueTrigger;
