import { Image, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class ImageService {
    private prisma;
    constructor(prisma: PrismaService);
    findLastImage(): Promise<Image>;
    createThisImage(file: Prisma.ImageCreateInput): Promise<Image>;
    createThatImage(file: Prisma.ImageCreateInput): Promise<Image>;
}
