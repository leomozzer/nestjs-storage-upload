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

    async ReadQueue(queue: string, number: string | undefined){
        try {
            const queueClient = this.ConnectOnQueue().getQueueClient(queue)
            const listMessages = await queueClient.peekMessages({
                numberOfMessages: number === undefined ? 10 : Number(number)
            });
            return listMessages.peekedMessageItems
        } catch (error) {
            return error
        }
    }
}
