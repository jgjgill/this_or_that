import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GoogleOauthService } from './google-oauth.service';

@Injectable()
export class Serializer extends PassportSerializer {
  constructor(private readonly googleOauthService: GoogleOauthService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    // console.log('serializeUser');
    done(null, user);
  }

  async deserializeUser(payload: User, done: CallableFunction) {
    const user = await this.googleOauthService.findUser(payload.id);

    // console.log('deserializeUser');
    return user ? await done(null, user) : await done(null, null);
  }
}
