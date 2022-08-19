import { Body, Controller, Post } from '@nestjs/common';
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
}
