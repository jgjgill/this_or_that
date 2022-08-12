import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { Image } from '@prisma/client';

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
  fs.mkdirSync('uploads/this');
  fs.mkdirSync('uploads/that');
}

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('-1')
  async findLastImage(): Promise<Image> {
    return this.imageService.findLastImage();
  }

  @Post('this_image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/this');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
    }),
  )
  async createThisImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = file.path;
    const createdAt = new Date();
    const updatedAt = new Date();

    return this.imageService.createThisImage({
      imagePath,
      createdAt,
      updatedAt,
    });
  }

  @Post('that_image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/that');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
    }),
  )
  async createThatImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = file.path;
    const createdAt = new Date();
    const updatedAt = new Date();

    return this.imageService.createThatImage({
      imagePath,
      createdAt,
      updatedAt,
    });
  }
}
