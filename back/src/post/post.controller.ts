import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostData } from '@prisma/client';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAllPost(): Promise<PostData[] | null> {
    return this.postService.findAllPost();
  }

  @Post()
  async createPost(@Body() post: PostData): Promise<PostData> {
    const { authorId, ...newPost } = post;
    return this.postService.createPost({
      ...newPost,
      author: {
        connect: { id: authorId },
      },
    });
  }
}
