import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private primsa: PrismaService) {}

  async findUser(user: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.primsa.user.findUnique({
      where: { id: user.id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.primsa.user.create({ data });
  }
}
