import { Post as PostData } from '@prisma/client';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAllPost(skip: number): Promise<PostData[] | null>;
    findPost(postId: number): Promise<PostData | null>;
    createPost(post: PostData): Promise<PostData>;
    deletePost(postId: number): Promise<PostData>;
}
