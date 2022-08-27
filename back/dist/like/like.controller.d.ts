import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    updatePostLike(body: {
        postId: number;
    }, user: any): Promise<void>;
    updateCommentLike(commentId: string, user: any): Promise<void>;
    updateReCommentLike(reCommentId: string, user: any): Promise<void>;
}
