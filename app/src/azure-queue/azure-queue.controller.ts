import { Controller, Get, Query } from '@nestjs/common';
import {AzureQueueService} from './azure-queue.service';

@Controller('azure-queue')
export class AzureQueueController {
    constructor(private readonly queueService: AzureQueueService){}

    @Get()
    async ReadQueue(@Query('number') number){
        console.log(number)
        return this.queueService.ReadQueue(process.env.AZURE_STORAGE_QUEUE, number)
    }
}
