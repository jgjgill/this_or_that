import { User as UserType } from '@prisma/client';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findMyInfo(user: UserType): Promise<UserType>;
    findProfileInfo(user: UserType): Promise<UserType>;
    findMyPostInfo(user: UserType, postId: string): Promise<any>;
    findMyReCommentInfo(user: UserType, commentId: string): Promise<any>;
    findUser(id: string): Promise<UserType | null>;
    changeName(user: UserType, body: any): Promise<UserType>;
}
