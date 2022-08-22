import { Controller, Get, Param, Query } from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('myInfo')
  async findMyInfo(@User() user: UserType): Promise<UserType> {
    console.log(user);
    return this.userService.findMyInfo({ userId: user.id });
  }

  @Get('me')
  async findMyPostInfo(
    @User() user,
    @Query('postId') postId: string,
  ): Promise<any> {
    // console.log(user);
    return user
      ? this.userService.findMyPostInfo({ user, postId: Number(postId) })
      : { isLiked: false, isVoted: false };
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<UserType | null> {
    return this.userService.findUser({ id: Number(id) });
  }
}
