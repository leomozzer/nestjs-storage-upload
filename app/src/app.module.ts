import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AzureStorageModule } from './azure-storage/azure-storage.module';
import { AzureQueueModule } from './azure-queue/azure-queue.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AzureStorageModule,
    AzureQueueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
