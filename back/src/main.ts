import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('This Or That')
    .setDescription('This Or That API description')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: app.get(ConfigService).get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3005);
}
bootstrap();
