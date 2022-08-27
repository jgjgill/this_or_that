import { PrismaService } from 'src/prisma.service';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment({ postId, comment, userId }: {
        postId: any;
        comment: any;
        userId: any;
    }): Promise<import(".prisma/client").Comment>;
    deleteComment(): Promise<void>;
}
