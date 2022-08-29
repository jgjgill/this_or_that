import { Vote } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class VoteService {
    private prisma;
    constructor(prisma: PrismaService);
    createPostVote({ postId, userId, assignedBy, }: {
        postId: number;
        userId: number;
        assignedBy: 'this' | 'that';
    }): Promise<Vote>;
}
