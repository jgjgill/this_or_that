import { PrismaService } from 'src/prisma.service';
export declare class LikeService {
    private prisma;
    constructor(prisma: PrismaService);
    updatePostLike({ postId, userId }: {
        postId: any;
        userId: any;
    }): Promise<void>;
    updateCommentLike({ commentId, userId }: {
        commentId: any;
        userId: any;
    }): Promise<void>;
    updateReCommentLike({ reCommentId, userId }: {
        reCommentId: any;
        userId: any;
    }): Promise<void>;
}
