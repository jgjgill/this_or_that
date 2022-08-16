import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService, PrismaService],
})
export class VoteModule {}
