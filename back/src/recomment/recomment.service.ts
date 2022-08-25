import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecommentService {
  constructor(private prisma: PrismaService) {}

  async createReComment({ postId, commentId, comment, userId }) {
    return this.prisma.reComment.create({
      data: {
        reCommentPostId: postId,
        reCommentCommentId: commentId,
        reCommentUserId: userId,
        content: comment,
      },
    });
  }
}
