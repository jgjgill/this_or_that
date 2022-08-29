import { CreateReCoomentDto } from './dto/create-reComment.dto';
import { RecommentService } from './recomment.service';
export declare class RecommentController {
    private readonly recommentService;
    constructor(recommentService: RecommentService);
    createReComment(query: any, reCommentData: CreateReCoomentDto, user: any): Promise<import(".prisma/client").ReComment>;
}
