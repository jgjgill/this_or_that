import { Post as PostData } from '@prisma/client';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAllPost(skip: string): Promise<PostData[] | null>;
    findPost(postId: string): Promise<any | null>;
    createPost(post: PostData): Promise<PostData>;
    deletePost(postId: string): Promise<PostData>;
}
