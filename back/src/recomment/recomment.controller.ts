import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { CreateReCoomentDto } from './dto/create-reComment.dto';
import { RecommentService } from './recomment.service';

@Controller('recomment')
@UseGuards(LoggedInGuard)
@ApiTags('대댓글')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Post()
  @ApiOperation({ summary: '대댓글 생성', description: '대댓글 생성하기' })
  @ApiQuery({ name: 'postId', example: 1, required: true })
  @ApiQuery({ name: 'commentId', example: 1, required: true })
  async createReComment(
    @Query(ParseIntPipe) query,
    @Body() reCommentData: CreateReCoomentDto,
    @User() user,
  ) {
    const { commentId, postId } = query;
    return this.recommentService.createReComment({
      User: { connect: { id: user.id } },
      Post: { connect: { id: postId } },
      Comment: { connect: { id: commentId } },
      content: reCommentData.comment,
    });
  }
}
