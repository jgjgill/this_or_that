import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserService {
    private primsa;
    constructor(primsa: PrismaService);
    findMyInfo(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User>;
    findProfileInfo({ userId }: {
        userId: number;
    }): Promise<User & {
        comments: import(".prisma/client").Comment[];
        posts: {
            id: number;
            title: string;
            this: string;
            that: string;
            description: string;
        }[];
        _count: {
            posts: number;
        };
    }>;
    findMyPostInfo({ userId, postId }: {
        userId: any;
        postId: any;
    }): Promise<{
        userId: any;
        isLiked: boolean;
        isVoted: boolean;
        commentIsLikedArray: {
            isLiked: boolean;
        }[];
    }>;
    findMyReCommentInfo({ userId, commentId }: {
        userId: any;
        commentId: any;
    }): Promise<{
        reCommentIsLikedArray: {
            isLiked: boolean;
        }[];
    }>;
    findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    changeName({ userId, newName }: {
        userId: number;
        newName: string;
    }): Promise<User>;
}
