import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User as UserData } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async createComment(
    @Query('postId') postId: string,
    @Body() data,
    @User() user: UserData,
  ) {
    return this.commentService.createComment({
      postId: Number(postId),
      comment: data.comment,
      userId: user.id,
    });
  }

  @Delete()
  async deleteComment() {
    return this.commentService.deleteComment();
  }
}
