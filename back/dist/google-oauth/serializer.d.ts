import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GoogleOauthService } from './google-oauth.service';
export declare class Serializer extends PassportSerializer {
    private readonly googleOauthService;
    constructor(googleOauthService: GoogleOauthService);
    serializeUser(user: User, done: CallableFunction): void;
    deserializeUser(payload: User, done: CallableFunction): Promise<any>;
}
