import { Inject, Injectable } from '@nestjs/common';
import { TableServiceClient, TableClient } from "@azure/data-tables"

@Injectable()
export class AzureTableService {
    getTableClient(){
        try {
            const tableClient = TableClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.AZURE_STORAGE_TABLE)
            return tableClient;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async CreateEntity(entity: object){
        try {
            const tableClient = this.getTableClient();
            let result = await tableClient.createEntity({
                partitionKey: "something",
                rowKey: '3',
                ...entity
            })
            console.log(result)
            return result;
        } catch (error) {
            return error
        }
    }

    async ReadEntities(){
        try {
            const tableClient = this.getTableClient();
            const listEntities = tableClient.listEntities()
            const iterator = listEntities.byPage({maxPageSize: 50})
            let entities = []
            for await (const page of iterator){
                entities = page;
                break
            }
            return entities;
        } catch (error) {
            
        }
    }
}
