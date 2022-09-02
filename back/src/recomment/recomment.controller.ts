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
  @ApiOperation({ summary: '대댓글 생성 기능', description: '대댓글 생성' })
  @ApiQuery({ name: 'postId', example: 1, required: true })
  @ApiQuery({ name: 'commentId', example: 1, required: true })
  async createReComment(
    @Query('commentId', ParseIntPipe) commentId,
    @Query('postId', ParseIntPipe) postId,
    @Body() reCommentData: CreateReCoomentDto,
    @User() user,
  ) {
    return this.recommentService.createReComment({
      User: { connect: { id: user.id } },
      Post: { connect: { id: postId } },
      Comment: { connect: { id: commentId } },
      content: reCommentData.comment,
    });
  }

  @Delete(':reCommentId')
  @ApiOperation({ summary: '대댓글 삭제 기능', description: '대댓글 생성' })
  async deleteReComment(
    @Param('reCommentId', ParseIntPipe) reCommentId: number,
  ) {
    return this.recommentService.deleteReComment({ id: reCommentId });
  }
}
