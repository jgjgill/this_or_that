import { Body, Controller, Post, Query } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { RecommentService } from './recomment.service';

@Controller('recomment')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Post()
  async createReComment(@Query() query, @Body() data, @User() user) {
    const { commentId, postId } = query;
    return this.recommentService.createReComment({
      postId: Number(postId),
      commentId: Number(commentId),
      comment: data.comment,
      userId: user.id,
    });
  }
}
