import { Test, TestingModule } from '@nestjs/testing';
import { AzureTableController } from './azure-table.controller';

describe('AzureTableController', () => {
  let controller: AzureTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AzureTableController],
    }).compile();

    controller = module.get<AzureTableController>(AzureTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
