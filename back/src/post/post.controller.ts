import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Post as PostData } from '@prisma/client';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('게시판')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: '전체 게시판',
    description: '모든 게시판 불러오기(무한 스크롤)',
  })
  @ApiQuery({ name: 'skip', example: 5, required: true })
  async findAllPost(
    @Query('skip', ParseIntPipe) skip: number,
  ): Promise<PostData[] | null> {
    return this.postService.findAllPost({ skip: skip });
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 게시판', description: '특정 게시판 불러오기' })
  @ApiParam({ name: 'id', example: 1, required: true })
  async findPost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostData | null> {
    return this.postService.findPost(postId);
  }

  @Post()
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '게시판 생성', description: '게시판 생성하기' })
  async createPost(@Body() post: PostData): Promise<PostData> {
    const { authorId, ...newPost } = post;
    return this.postService.createPost({
      ...newPost,
      author: { connect: { id: authorId } },
    });
  }

  @Delete(':id')
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '게시판 삭제', description: '게시판 삭제하기' })
  @ApiParam({ name: 'id', example: 1, required: true })
  async deletePost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostData> {
    return this.postService.deletePost({ id: postId });
  }
}
