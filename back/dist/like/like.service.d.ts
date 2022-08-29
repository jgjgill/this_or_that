import { CommentLike, Like, ReCommentLike } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class LikeService {
    private prisma;
    constructor(prisma: PrismaService);
    updatePostLike({ postId, userId, }: {
        postId: number;
        userId: number;
    }): Promise<Like>;
    updateCommentLike({ commentId, userId, }: {
        commentId: number;
        userId: number;
    }): Promise<CommentLike>;
    updateReCommentLike({ reCommentId, userId, }: {
        reCommentId: number;
        userId: number;
    }): Promise<ReCommentLike>;
}
