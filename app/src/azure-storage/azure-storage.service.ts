import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class AzureStorageService {

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
    }

    async ReadFile(fileName: string){
        const blobClient = this.getBlobClient(fileName);
        var blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }
}
