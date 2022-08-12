import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule, PostModule, CommentModule, LikeModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
