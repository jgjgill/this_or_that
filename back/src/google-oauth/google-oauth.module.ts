import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { PrismaService } from 'src/prisma.service';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { Serializer } from './serializer';

@Module({
  imports: [PassportModule.register({ session: true }), JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [
    GoogleOauthService,
    GoogleOauthStrategy,
    PrismaService,
    Serializer,
  ],
})
export class GoogleOauthModule {}
