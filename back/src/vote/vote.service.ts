import { Injectable } from '@nestjs/common';
import { Prisma, Vote } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async findPostVotes(postId: number): Promise<any | null> {
    const thisCount = await this.prisma.vote.count({
      where: {
        postId,
        assignedBy: 'this',
      },
    });

    const thatCount = await this.prisma.vote.count({
      where: {
        postId,
        assignedBy: 'that',
      },
    });

    const sumCount = await this.prisma.vote.count({
      where: {
        postId,
      },
    });

    return { thisCount, thatCount, sumCount };
  }

  async createPostVote(postVoteData: Prisma.VoteCreateInput): Promise<Vote> {
    console.log(postVoteData);
    return this.prisma.vote.create({
      data: postVoteData,
    });
  }
}
