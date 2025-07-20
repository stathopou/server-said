import { Test, TestingModule } from '@nestjs/testing';
import { MessageRouterService } from './message-router.service';

describe('MessageRouterService', () => {
  let service: MessageRouterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageRouterService],
    }).compile();

    service = module.get<MessageRouterService>(MessageRouterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
