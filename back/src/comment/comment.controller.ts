import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Comment, User as UserData } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
@UseGuards(LoggedInGuard)
@ApiTags('댓글')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 추가 기능', description: '댓글 생성' })
  @ApiQuery({
    name: 'postId',
    example: 1,
    required: true,
  })
  async createComment(
    @Query('postId', ParseIntPipe) postId: number,
    @Body() commentData: CreateCommentDto,
    @User() user: UserData,
  ): Promise<Comment> {
    return this.commentService.createComment({
      Post: { connect: { id: postId } },
      User: { connect: { id: user.id } },
      content: commentData.comment,
    });
  }

  @Delete(':commentId')
  @ApiOperation({ summary: '댓글 삭제 기능', description: '댓글 삭제' })
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<Comment> {
    return this.commentService.deleteComment({ id: commentId });
  }
}
