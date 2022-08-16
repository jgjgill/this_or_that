import { Injectable } from '@nestjs/common';
import { Prisma, Vote } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async findPostVotes(id: number): Promise<any | null> {
    const thisCount = await this.prisma.vote.count({
      where: {
        postId: id,
        assignedBy: 'this',
      },
    });

    const thatCount = await this.prisma.vote.count({
      where: {
        postId: id,
        assignedBy: 'that',
      },
    });

    const sumCount = await this.prisma.vote.count({
      where: {
        postId: id,
      },
    });

    return { thisCount, thatCount, sumCount };
  }

  async createPostVote(postVoteData: Prisma.VoteCreateInput): Promise<Vote> {
    return this.prisma.vote.create({
      data: postVoteData,
    });
  }
}
