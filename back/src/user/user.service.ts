import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private primsa: PrismaService) {}

  async findUser(user: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.primsa.user.findUnique({
      where: { id: user.id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.primsa.user.create({ data });
  }

  async findMyPostInfo({ user, postId }) {
    const isLiked = Boolean(
      await this.primsa.like.findFirst({
        where: { likeUserId: user.id, likePostId: postId },
        select: { id: true },
      }),
    );

    const isVoted = Boolean(
      await this.primsa.vote.findFirst({
        where: { userId: user.id, postId },
        select: { postId: true, userId: true },
      }),
    );

    return { isLiked, isVoted };
  }
}
