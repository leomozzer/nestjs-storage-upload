import { Inject, Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { AzureQueueService } from 'src/azure-queue/azure-queue.service'

@Injectable()
export class AzureStorageService {
    @Inject(AzureQueueService)
    private readonly queueService: AzureQueueService;

    getBlobClient(imageName:string):BlockBlobClient{
        try {
            const blobClientService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobClientService.getContainerClient(process.env.AZURE_STORAGE_CONTAINER);
            const blobClient = containerClient.getBlockBlobClient(imageName);
            return blobClient;   
        } catch (error) {
            return error;
        }
    }
    async UploadFile(file:Express.Multer.File){
        const blobClient = this.getBlobClient(file.originalname);
        await blobClient.uploadData(file.buffer);
        await this.queueService.SendMessage(process.env.AZURE_STORAGE_QUEUE, file.originalname)
    }

    async ReadFile(fileName: string){
        const blobClient = this.getBlobClient(fileName);
        var blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }

    async DeleteFile(filename: string){
        const blobClient = this.getBlobClient(filename);
        await blobClient.deleteIfExists()
    }
}
