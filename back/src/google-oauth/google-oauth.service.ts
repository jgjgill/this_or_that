import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoogleOauthService {
  constructor(private prisma: PrismaService) {}
  async validate({ email, name }) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) return user;

    const newUser = await this.prisma.user.create({
      data: { email, name },
    });

    return newUser;
  }

  async findUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
