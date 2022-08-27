import { Vote } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class VoteService {
    private prisma;
    constructor(prisma: PrismaService);
    createPostVote({ postId, userId, assignedBy }: {
        postId: any;
        userId: any;
        assignedBy: any;
    }): Promise<Vote>;
}
