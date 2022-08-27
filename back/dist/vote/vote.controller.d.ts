import { Vote } from '@prisma/client';
import { VoteService } from './vote.service';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    createPostVote(postVoteData: any, user: any): Promise<Vote>;
}
