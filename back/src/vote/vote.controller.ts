import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Vote } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
@ApiTags('투표')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '투표 기능', description: '투표 기능' })
  async createPostVote(
    @Body() postVoteData: CreateVoteDto,
    @User() user,
  ): Promise<Vote> {
    const { postId, assignedBy } = postVoteData;
    return this.voteService.createPostVote({
      postId,
      userId: user.id,
      assignedBy,
    });
  }
}
