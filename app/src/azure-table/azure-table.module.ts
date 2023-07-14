import { Module } from '@nestjs/common';
import { AzureTableService } from './azure-table.service';
import { AzureTableController } from './azure-table.controller';

@Module({
    providers: [AzureTableService],
    exports: [AzureTableService],
    controllers: [AzureTableController]
})
export class AzureTableModule {}
