import { Controller, Get } from '@nestjs/common';
import { AzureTableService } from './azure-table.service';

@Controller('azure-table')
export class AzureTableController {
    constructor(private readonly tableService: AzureTableService){}

    @Get()
    async ListEntities(){
        const entities = this.tableService.ReadEntities()
        return entities;
    }
}
