import { Injectable } from '@nestjs/common';
import { Prisma, ReComment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecommentService {
  constructor(private prisma: PrismaService) {}

  async createReComment(data: Prisma.ReCommentCreateInput): Promise<ReComment> {
    return this.prisma.reComment.create({ data });
  }

  async deleteReComment(
    id: Prisma.ReCommentWhereUniqueInput,
  ): Promise<ReComment> {
    return this.prisma.reComment.delete({ where: id });
  }
}
