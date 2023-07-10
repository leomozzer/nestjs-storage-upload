import { Test, TestingModule } from '@nestjs/testing';
import { AzureQueueController } from './azure-queue.controller';

describe('AzureQueueController', () => {
  let controller: AzureQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AzureQueueController],
    }).compile();

    controller = module.get<AzureQueueController>(AzureQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
