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
  async findMyInfo(@User() user: UserType): Promise<UserType> {
    console.log(user);
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
      : { isLiked: false, isVoted: false };
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<UserType | null> {
    return this.userService.findUser({ id: Number(id) });
  }

  @Post('name')
  async changeName(@User() user: UserType, @Body() body) {
    return this.userService.changeName({ userId: user.id, newName: body.name });
  }
}
