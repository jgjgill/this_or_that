import { User as UserData } from '@prisma/client';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(postId: string, data: any, user: UserData): Promise<import(".prisma/client").Comment>;
    deleteComment(): Promise<void>;
}
