import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserService {
    private primsa;
    constructor(primsa: PrismaService);
    findMyInfo({ userId }: {
        userId: any;
    }): Promise<User>;
    findProfileInfo({ userId }: {
        userId: any;
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
    findMyPostInfo({ user, postId }: {
        user: any;
        postId: any;
    }): Promise<{
        userId: any;
        isLiked: boolean;
        isVoted: boolean;
        commentIsLikedArray: {
            isLiked: boolean;
        }[];
    }>;
    findMyReCommentInfo({ user, commentId }: {
        user: any;
        commentId: any;
    }): Promise<{
        reCommentIsLikedArray: {
            isLiked: boolean;
        }[];
    }>;
    findUser(user: Prisma.UserWhereUniqueInput): Promise<User | null>;
    changeName({ userId, newName }: {
        userId: any;
        newName: any;
    }): Promise<User>;
}
