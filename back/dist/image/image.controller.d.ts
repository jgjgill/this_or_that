/// <reference types="multer" />
import { ImageService } from './image.service';
import { Image } from '@prisma/client';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    findLastImage(): Promise<Image>;
    createThisImage(file: Express.Multer.File): Promise<Image>;
    createThatImage(file: Express.Multer.File): Promise<Image>;
}
