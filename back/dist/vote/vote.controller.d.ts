import { Vote } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    createPostVote(postVoteData: CreateVoteDto, user: any): Promise<Vote>;
}
