import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Vote } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/google-oauth/logged-in.guard';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async createPostVote(@Body() postVoteData, @User() user): Promise<Vote> {
    const { postId, assignedBy } = postVoteData;
    return this.voteService.createPostVote({
      postId,
      userId: user.id,
      assignedBy,
    });
  }
}
