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
        comments: true,
        posts: { select: selectedPostInfo },
        _count: { select: { posts: true } },
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

    const commets = await this.primsa.comment.findMany({
      where: { commentPostId: postId },
      select: { CommentLike: { select: { likeUserId: true } } },
    });

    const commentIsLikedArray = commets.map((item) => ({
      isLiked: Boolean(
        item.CommentLike.find((test) => test.likeUserId === user.id),
      ),
    }));

    return { userId: user.id, isLiked, isVoted, commentIsLikedArray };
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
