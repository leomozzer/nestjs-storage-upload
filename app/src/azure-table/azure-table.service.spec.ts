import { Test, TestingModule } from '@nestjs/testing';
import { AzureTableService } from './azure-table.service';

describe('AzureTableService', () => {
  let service: AzureTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureTableService],
    }).compile();

    service = module.get<AzureTableService>(AzureTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
