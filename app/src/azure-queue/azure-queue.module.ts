import { Module } from '@nestjs/common';
import { AzureQueueController } from './azure-queue.controller';
import { AzureQueueService } from './azure-queue.service';

@Module({
  providers: [AzureQueueService],
  controllers: [AzureQueueController],
  exports: [AzureQueueService]
})
export class AzureQueueModule {}
