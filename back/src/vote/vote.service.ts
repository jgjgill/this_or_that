import { Injectable } from '@nestjs/common';
import { Prisma, Vote } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async createPostVote({
    postId,
    userId,
    assignedBy,
  }: {
    postId: number;
    userId: number;
    assignedBy: 'this' | 'that';
  }): Promise<Vote> {
    return this.prisma.vote.upsert({
      where: { postId_userId: { postId, userId } },
      create: { postId, userId, assignedBy },
      update: { assignedBy },
    });
  }
}
