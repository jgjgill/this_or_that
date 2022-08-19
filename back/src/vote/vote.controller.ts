import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Vote } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/google-oauth/logged-in.guard';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get(':id')
  async findPostVotes(@Param('id') postId: string): Promise<any | null> {
    return this.voteService.findPostVotes(Number(postId));
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async createPostVote(
    @Body() postVoteData: Vote,
    @User() user,
  ): Promise<Vote> {
    const { postId, ...newVote } = postVoteData;
    return this.voteService.createPostVote({
      ...newVote,
      post: { connect: { id: postId } },
      user: { connect: { id: user.id } },
    });
  }
}
