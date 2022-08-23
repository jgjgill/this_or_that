import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private primsa: PrismaService) {}

  async findMyInfo({ userId }) {
    return this.primsa.user.findUnique({
      where: { id: userId },
    });
  }

  async findProfileInfo({ userId }) {
    const selectedPostInfo = {
      id: true,
      title: true,
      this: true,
      that: true,
      description: true,
    };

    return this.primsa.user.findUnique({
      where: { id: userId },
      include: {
        votedPosts: { select: { post: { select: selectedPostInfo } } },
        comments: true,
        likes: { select: { Post: { select: selectedPostInfo } } },
        posts: { select: selectedPostInfo },
        _count: true,
      },
    });
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

    return { userId: user.id, isLiked, isVoted };
  }

  async findUser(user: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.primsa.user.findUnique({
      where: { id: user.id },
    });
  }

  async changeName({ userId, newName }) {
    return this.primsa.user.update({
      where: { id: userId },
      data: { name: newName },
    });
  }
}
