import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RecommentController } from './recomment.controller';
import { RecommentService } from './recomment.service';

@Module({
  controllers: [RecommentController],
  providers: [RecommentService, PrismaService],
})
export class RecommentModule {}
