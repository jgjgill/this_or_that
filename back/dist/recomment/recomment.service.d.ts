import { PrismaService } from 'src/prisma.service';
export declare class RecommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createReComment({ postId, commentId, comment, userId }: {
        postId: any;
        commentId: any;
        comment: any;
        userId: any;
    }): Promise<import(".prisma/client").ReComment>;
}
