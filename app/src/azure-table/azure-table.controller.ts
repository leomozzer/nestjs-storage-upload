import { Controller, Get, Query } from '@nestjs/common';
import { AzureTableService } from './azure-table.service';

@Controller('azure-table')
export class AzureTableController {
    constructor(private readonly tableService: AzureTableService) { }

    @Get()
    async ListEntities(@Query('partionKey') partionKey) {
        const entities = this.tableService.ReadEntities(partionKey)
        return entities;
    }
}
