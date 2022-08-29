import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class RecommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createReComment(data: Prisma.ReCommentCreateInput): Promise<import(".prisma/client").ReComment>;
}
