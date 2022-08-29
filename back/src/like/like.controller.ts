import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentLike, Like, ReCommentLike } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { TogglePostLikeDto } from './dto/toggle-like-dto';
import { LikeService } from './like.service';

@Controller('like')
@UseGuards(LoggedInGuard)
@ApiTags('좋아요')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({
    summary: '게시판 좋아요 기능',
    description: '게시판 좋아요 토글 이벤트',
  })
  async updatePostLike(
    @Body() postData: TogglePostLikeDto,
    @User() user,
  ): Promise<Like> {
    const { postId } = postData;

    return this.likeService.updatePostLike({ postId, userId: user.id });
  }

  @Post('comment')
  @ApiOperation({
    summary: '댓글 좋아요 기능',
    description: '댓글 좋아요 토글 이벤트',
  })
  @ApiQuery({
    name: 'commentId',
    example: 1,
    required: true,
  })
  async updateCommentLike(
    @Query('commentId', ParseIntPipe) commentId: number,
    @User() user,
  ): Promise<CommentLike> {
    return this.likeService.updateCommentLike({
      commentId: commentId,
      userId: user.id,
    });
  }

  @Post('reComment')
  @ApiOperation({
    summary: '대댓글 좋아요 기능',
    description: '대댓글 좋아요 토글 이벤트',
  })
  @ApiQuery({
    name: 'reCommentId',
    example: 1,
    required: true,
  })
  async updateReCommentLike(
    @Query('reCommentId', ParseIntPipe) reCommentId: number,
    @User() user,
  ): Promise<ReCommentLike> {
    return this.likeService.updateReCommentLike({
      reCommentId: reCommentId,
      userId: user.id,
    });
  }
}
