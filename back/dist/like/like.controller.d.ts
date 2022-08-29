import { CommentLike, Like, ReCommentLike } from '@prisma/client';
import { TogglePostLikeDto } from './dto/toggle-like-dto';
import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    updatePostLike(postData: TogglePostLikeDto, user: any): Promise<Like>;
    updateCommentLike(commentId: number, user: any): Promise<CommentLike>;
    updateReCommentLike(reCommentId: number, user: any): Promise<ReCommentLike>;
}
