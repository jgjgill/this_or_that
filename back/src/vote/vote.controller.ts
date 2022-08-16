import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Vote } from '@prisma/client';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get(':id')
  async findPostVotes(@Param('id') id: string): Promise<any | null> {
    return this.voteService.findPostVotes(Number(id));
  }

  @Post()
  async createPostVote(@Body() postVoteData: Vote): Promise<Vote> {
    const { postId, userId, ...newVote } = postVoteData;
    return this.voteService.createPostVote({
      ...newVote,
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    });
  }
}
