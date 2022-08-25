import { Body, Controller, Post, Query } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async updatePostLike(@Body() body: { postId: number }, @User() user) {
    const { postId } = body;

    return this.likeService.updatePostLike({ postId, userId: user.id });
  }

  @Post('comment')
  async updateCommentLike(@Query('commentId') commentId: string, @User() user) {
    return this.likeService.updateCommentLike({
      commentId: Number(commentId),
      userId: user.id,
    });
  }

  @Post('reComment')
  async updateReCommentLike(
    @Query('reCommentId') reCommentId: string,
    @User() user,
  ) {
    return this.likeService.updateReCommentLike({
      reCommentId: Number(reCommentId),
      userId: user.id,
    });
  }
}
