import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAllPost(): Promise<Post[] | null> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },

        _count: {
          select: { comments: true, likes: true, voters: true },
        },
      },

      orderBy: {
        id: 'desc',
      },
    });
  }

  async findPost(postId: number): Promise<any | null> {
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

    const postInfo = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { select: { name: true } },
        comments: true,
        _count: {
          select: {
            voters: true,
          },
        },
      },
    });

    return { ...postInfo, thisCount, thatCount };
  }

  async createPost(postData: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data: postData });
  }
}
