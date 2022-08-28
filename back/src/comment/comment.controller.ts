import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Comment, User as UserData } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { CommentService } from './comment.service';

@Controller('comment')
@UseGuards(LoggedInGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Query('postId', ParseIntPipe) postId: number,
    @Body() commentData: { comment: string },
    @User() user: UserData,
  ): Promise<Comment> {
    return this.commentService.createComment({
      Post: { connect: { id: postId } },
      User: { connect: { id: user.id } },
      content: commentData.comment,
    });
  }

  @Delete()
  async deleteComment() {
    return this.commentService.deleteComment();
  }
}
