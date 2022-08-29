import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('myInfo')
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '내 정보 찾기', description: '내 정보 찾기' })
  async findMyInfo(@User() user: UserType): Promise<UserType> {
    return this.userService.findMyInfo({ id: user.id });
  }

  @Get('profileInfo')
  @UseGuards(LoggedInGuard)
  @ApiOperation({
    summary: '내 프로필 정보',
    description: '내 프로필 정보 불러오기',
  })
  async findProfileInfo(@User() user: UserType): Promise<UserType> {
    return this.userService.findProfileInfo({ userId: user.id });
  }

  @Get('me')
  @ApiOperation({
    summary: '게시판 내 정보 확인',
    description: '게시판 내 좋아요, 투표 여부 확인하기',
  })
  @ApiQuery({ name: 'postId', example: 1, required: true })
  async findMyPostInfo(
    @User() user: UserType,
    @Query('postId', ParseIntPipe) postId: number,
  ): Promise<any> {
    return user
      ? this.userService.findMyPostInfo({ userId: user.id, postId })
      : { isLiked: false, isVoted: false, commentIsLikedArray: [] };
  }

  @Get('me/recomment')
  @ApiOperation({
    summary: '게시판 대댓글 내 정보 확인',
    description: '게시판 대댓글 내 좋아요 여부 확인하기',
  })
  @ApiQuery({ name: 'commentId', example: 1, required: true })
  async findMyReCommentInfo(
    @User() user: UserType,
    @Query('commentId', ParseIntPipe) commentId: number,
  ): Promise<any> {
    return user
      ? this.userService.findMyReCommentInfo({ userId: user.id, commentId })
      : { reCommentIsLikedArray: [] };
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 찾기', description: '유저 찾기' })
  @ApiParam({ name: 'id', example: 1, required: true })
  async findUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserType | null> {
    return this.userService.findUser({ id });
  }

  @Post('name')
  @UseGuards(LoggedInGuard)
  @ApiOperation({
    summary: '내 닉네임 변경',
    description: '내 닉네임 변경하기',
  })
  async changeName(@User() user: UserType, @Body() body: { name: string }) {
    return this.userService.changeName({ userId: user.id, newName: body.name });
  }
}
