import { Injectable } from '@nestjs/common';
import { Image, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async findLastImage(): Promise<Image> {
    return this.prisma.image.findFirst({
      take: -1,
    });
  }

  async createThisImage(file: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data: file });
  }

  async createThatImage(file: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data: file });
  }
}
