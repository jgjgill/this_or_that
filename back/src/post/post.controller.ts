import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Post as PostData } from '@prisma/client';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAllPost(@Query('skip') skip: string): Promise<PostData[] | null> {
    return this.postService.findAllPost({ skip: Number(skip) });
  }

  @Get(':id')
  async findPost(@Param('id') postId: string): Promise<any | null> {
    return this.postService.findPost(Number(postId));
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async createPost(@Body() post: PostData): Promise<PostData> {
    const { authorId, ...newPost } = post;
    return this.postService.createPost({
      ...newPost,
      author: { connect: { id: authorId } },
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: string): Promise<PostData> {
    return this.postService.deletePost({ id: Number(postId) });
  }
}
