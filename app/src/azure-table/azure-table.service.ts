import { Injectable } from '@nestjs/common';
import { TableClient, odata } from "@azure/data-tables"

@Injectable()
export class AzureTableService {
    getTableClient() {
        try {
            const tableClient = TableClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.AZURE_STORAGE_TABLE)
            return tableClient;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getRowsFromPartionKey(partitionKey: string) {
        const tableClient = this.getTableClient();
        const listEntities = tableClient.listEntities({
            queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
        })
        const iterator = listEntities.byPage({ maxPageSize: 50 })
        let entities = []
        for await (const page of iterator) {
            entities = page;
            break
        }
        return entities.length;
    }

    async CreateEntity(entity: object) {
        try {
            const tableClient = this.getTableClient();
            const rowKey = await this.getRowsFromPartionKey('upload')
            let result = await tableClient.createEntity({
                partitionKey: "upload",
                rowKey: String(rowKey + 1),
                ...entity
            })
            return result;
        } catch (error) {
            return error
        }
    }

    async ReadEntities(partitionKey: string | undefined) {
        try {
            const tableClient = this.getTableClient();
            const listEntities = partitionKey === undefined ? tableClient.listEntities() : tableClient.listEntities({
                queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
            })
            const iterator = listEntities.byPage({ maxPageSize: 50 })
            let entities = []
            for await (const page of iterator) {
                entities = page;
                break
            }
            return entities;
        } catch (error) {

        }
    }
}
