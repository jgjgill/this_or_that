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

  async findPost(id: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: id,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: true,
      },
    });
  }

  async createPost(postData: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data: postData });
  }
}
