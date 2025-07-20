import { Test, TestingModule } from '@nestjs/testing';
import { SseListener } from './sse-listener';

describe('SseListener', () => {
  let provider: SseListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SseListener],
    }).compile();

    provider = module.get<SseListener>(SseListener);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
