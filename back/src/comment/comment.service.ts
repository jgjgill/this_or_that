import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment({ postId, comment, userId }) {
    return this.prisma.comment.create({
      data: {
        commentPostId: postId,
        commentUserId: userId,
        content: comment,
      },
    });
  }

  async deleteComment() {}
}
