import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async updatePostLike({ postId, userId }) {
    const alreadyExists = await this.prisma.like.findFirst({
      where: { likePostId: postId, likeUserId: userId },
    });

    if (alreadyExists) {
      await this.prisma.like.delete({
        where: { id: alreadyExists.id },
      });
    }

    if (!alreadyExists) {
      await this.prisma.like.create({
        data: {
          User: { connect: { id: userId } },
          Post: { connect: { id: postId } },
        },
      });
    }
  }

  async updateCommentLike({ commentId, userId }) {
    const alreadyExists = await this.prisma.commentLike.findFirst({
      where: { likeCommentId: commentId, likeUserId: userId },
    });

    if (alreadyExists) {
      await this.prisma.commentLike.delete({
        where: { id: alreadyExists.id },
      });
    }

    if (!alreadyExists) {
      await this.prisma.commentLike.create({
        data: {
          User: { connect: { id: userId } },
          Comment: { connect: { id: commentId } },
        },
      });
    }
  }
}
