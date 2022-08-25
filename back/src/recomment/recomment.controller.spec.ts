import { Test, TestingModule } from '@nestjs/testing';
import { RecommentController } from './recomment.controller';

describe('RecommentController', () => {
  let controller: RecommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommentController],
    }).compile();

    controller = module.get<RecommentController>(RecommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
