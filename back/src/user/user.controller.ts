import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findUser({ id: Number(id) });
  }
}
