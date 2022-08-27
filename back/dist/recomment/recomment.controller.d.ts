import { RecommentService } from './recomment.service';
export declare class RecommentController {
    private readonly recommentService;
    constructor(recommentService: RecommentService);
    createReComment(query: any, data: any, user: any): Promise<import(".prisma/client").ReComment>;
}
