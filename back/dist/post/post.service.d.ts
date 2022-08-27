import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPost({ skip }: {
        skip: any;
    }): Promise<Post[] | null>;
    findPost(postId: number): Promise<any | null>;
    createPost(postData: Prisma.PostCreateInput): Promise<Post>;
    deletePost(id: Prisma.PostWhereUniqueInput): Promise<Post>;
}
