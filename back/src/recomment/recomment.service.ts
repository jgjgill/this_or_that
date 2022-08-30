import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecommentService {
  constructor(private prisma: PrismaService) {}

  async createReComment(data: Prisma.ReCommentCreateInput) {
    console.log(data);
    return this.prisma.reComment.create({ data });
  }
}
