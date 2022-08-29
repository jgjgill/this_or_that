import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { Image } from '@prisma/client';
import { LoggedInGuard } from 'src/jwt-auth/logged-in.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
  fs.mkdirSync('uploads/this');
  fs.mkdirSync('uploads/that');
}

@Controller('image')
@UseGuards(LoggedInGuard)
@ApiTags('이미지')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('-1')
  @ApiOperation({
    summary: '등록 이미지 가져오기',
    description: '사용자가 마지막으로 등록한 이미지 불러오기',
  })
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
      limits: { fieldSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiOperation({
    summary: 'This Image 생성',
    description: 'This Image 저장',
  })
  async createThisImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = file.path;

    return this.imageService.createThisImage({
      imagePath,
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
      limits: { fieldSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiOperation({
    summary: 'That Image 생성',
    description: 'That Image 저장',
  })
  async createThatImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = file.path;

    return this.imageService.createThatImage({
      imagePath,
    });
  }
}
