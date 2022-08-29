import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private primsa: PrismaService) {}

  async findMyInfo(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.primsa.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findProfileInfo({ userId }: { userId: number }) {
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

  async findMyPostInfo({ userId, postId }) {
    const isLiked = Boolean(
      await this.primsa.like.findFirst({
        where: { likeUserId: userId, likePostId: postId },
        select: { id: true },
      }),
    );

    const isVoted = Boolean(
      await this.primsa.vote.findFirst({
        where: { userId, postId },
        select: { postId: true, userId: true },
      }),
    );

    const commets = await this.primsa.comment.findMany({
      where: { commentPostId: postId },
      select: { CommentLike: { select: { likeUserId: true } } },
    });

    const commentIsLikedArray = commets.map((item) => ({
      isLiked: Boolean(
        item.CommentLike.find((item) => item.likeUserId === userId),
      ),
    }));

    return { userId, isLiked, isVoted, commentIsLikedArray };
  }

  async findMyReCommentInfo({ userId, commentId }) {
    const reComments = await this.primsa.reComment.findMany({
      where: { reCommentCommentId: commentId },
      select: { ReCommentLike: { select: { likeUserId: true } } },
    });

    const reCommentIsLikedArray = reComments.map((item) => ({
      isLiked: Boolean(
        item.ReCommentLike.find((item) => item.likeUserId === userId),
      ),
    }));

    return { reCommentIsLikedArray };
  }

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.primsa.user.findUnique({ where: userWhereUniqueInput });
  }

  async changeName({ userId, newName }: { userId: number; newName: string }) {
    return this.primsa.user.update({
      where: { id: userId },
      data: { name: newName },
    });
  }
}
