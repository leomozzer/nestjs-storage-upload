import { Controller, Get } from '@nestjs/common';
import {AzureQueueService} from './azure-queue.service';

@Controller('azure-queue')
export class AzureQueueController {
    constructor(private readonly queueService: AzureQueueService){}

    @Get()
    async SendMessage(){
        return this.queueService.ReadQueue(process.env.AZURE_STORAGE_QUEUE)
    }
}
