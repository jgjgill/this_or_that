import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment(data: Prisma.CommentCreateInput): Promise<Comment>;
    deleteComment(): Promise<void>;
}
