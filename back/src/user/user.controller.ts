import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('myInfo')
  @UseGuards(LoggedInGuard)
  async findMyInfo(@User() user: UserType): Promise<UserType> {
    return this.userService.findMyInfo({ userId: user.id });
  }

  @Get('profileInfo')
  @UseGuards(LoggedInGuard)
  async findProfileInfo(@User() user: UserType): Promise<UserType> {
    console.log(user);
    return this.userService.findProfileInfo({ userId: user.id });
  }

  @Get('me')
  async findMyPostInfo(
    @User() user: UserType,
    @Query('postId') postId: string,
  ): Promise<any> {
    return user
      ? this.userService.findMyPostInfo({ user, postId: Number(postId) })
      : { isLiked: false, isVoted: false, commentIsLikedArray: [] };
  }

  @Get('me/recomment')
  async findMyReCommentInfo(
    @User() user: UserType,
    @Query('commentId') commentId: string,
  ): Promise<any> {
    const NumCommentId = Number(commentId);
    return user
      ? this.userService.findMyReCommentInfo({ user, commentId: NumCommentId })
      : { reCommentIsLikedArray: [] };
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<UserType | null> {
    return this.userService.findUser({ id: Number(id) });
  }

  @Post('name')
  @UseGuards(LoggedInGuard)
  async changeName(@User() user: UserType, @Body() body) {
    return this.userService.changeName({ userId: user.id, newName: body.name });
  }
}
