import { User as UserType } from '@prisma/client';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findMyInfo(user: UserType): Promise<UserType>;
    findProfileInfo(user: UserType): Promise<UserType>;
    findMyPostInfo(user: UserType, postId: number): Promise<any>;
    findMyReCommentInfo(user: UserType, commentId: number): Promise<any>;
    findUser(id: number): Promise<UserType | null>;
    changeName(user: UserType, body: {
        name: string;
    }): Promise<UserType>;
}
