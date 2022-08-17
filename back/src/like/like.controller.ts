import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async updatePostLike(@Body() body: { postId: number; userId: number }) {
    const { postId, userId } = body;

    return this.likeService.updatePostLike({ postId, userId });
  }
}
