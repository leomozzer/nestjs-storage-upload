import { Module } from '@nestjs/common';
import { AzureStorageService } from './azure-storage.service';
import { AzureStorageController } from './azure-storage.controller';
import { AzureQueueModule } from 'src/azure-queue/azure-queue.module';
import { AzureTableModule } from 'src/azure-table/azure-table.module';

@Module({
  imports: [AzureQueueModule, AzureTableModule],
  providers: [AzureStorageService],
  controllers: [AzureStorageController],
})
export class AzureStorageModule {}
