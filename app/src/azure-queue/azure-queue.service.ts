import { Injectable } from '@nestjs/common';
import {QueueServiceClient} from '@azure/storage-queue'

@Injectable()
export class AzureQueueService {
    ConnectOnQueue(){
        try {
            const queueClient = QueueServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            return queueClient
        } catch (error) {
            return error
        }
    }

    async SendMessage(queue: string, message: string){
        try {
            const queueClient = this.ConnectOnQueue().getQueueClient(queue)
            const sendMessage = await queueClient.sendMessage(message)
            return `Item ${sendMessage.messageId} was added`
        } catch (error) {
            return error
        }
    }

    async ReadQueue(queue: string){
        try {
            const queueClient = this.ConnectOnQueue().getQueueClient(queue)
            const listMessages = await queueClient.peekMessages();
            return listMessages.peekedMessageItems
        } catch (error) {
            return error
        }
    }
}
