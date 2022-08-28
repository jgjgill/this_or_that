import { Comment, User as UserData } from '@prisma/client';
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(postId: number, commentData: {
        comment: string;
    }, user: UserData): Promise<Comment>;
    deleteComment(): Promise<void>;
}
