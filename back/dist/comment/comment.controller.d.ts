import { Comment, User as UserData } from '@prisma/client';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(postId: number, commentData: CreateCommentDto, user: UserData): Promise<Comment>;
    deleteComment(): Promise<void>;
}
