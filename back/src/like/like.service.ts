import { Injectable } from '@nestjs/common';
import { CommentLike, Like, ReCommentLike } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async updatePostLike({
    postId,
    userId,
  }: {
    postId: number;
    userId: number;
  }): Promise<Like> {
    const alreadyExists = await this.prisma.like.findFirst({
      where: { likePostId: postId, likeUserId: userId },
    });

    if (alreadyExists) {
      return this.prisma.like.delete({
        where: { id: alreadyExists.id },
      });
    }

    if (!alreadyExists) {
      return this.prisma.like.create({
        data: {
          User: { connect: { id: userId } },
          Post: { connect: { id: postId } },
        },
      });
    }
  }

  async updateCommentLike({
    commentId,
    userId,
  }: {
    commentId: number;
    userId: number;
  }): Promise<CommentLike> {
    const alreadyExists = await this.prisma.commentLike.findFirst({
      where: { likeCommentId: commentId, likeUserId: userId },
    });

    if (alreadyExists) {
      return this.prisma.commentLike.delete({
        where: { id: alreadyExists.id },
      });
    }

    if (!alreadyExists) {
      return this.prisma.commentLike.create({
        data: {
          User: { connect: { id: userId } },
          Comment: { connect: { id: commentId } },
        },
      });
    }
  }

  async updateReCommentLike({
    reCommentId,
    userId,
  }: {
    reCommentId: number;
    userId: number;
  }): Promise<ReCommentLike> {
    const alreadyExists = await this.prisma.reCommentLike.findFirst({
      where: { likeReCommentId: reCommentId, likeUserId: userId },
    });

    if (alreadyExists) {
      return this.prisma.reCommentLike.delete({
        where: { id: alreadyExists.id },
      });
    }

    if (!alreadyExists) {
      return this.prisma.reCommentLike.create({
        data: {
          User: { connect: { id: userId } },
          ReComment: { connect: { id: reCommentId } },
        },
      });
    }
  }
}
