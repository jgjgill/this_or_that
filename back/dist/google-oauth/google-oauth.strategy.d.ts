import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleOauthService } from './google-oauth.service';
declare const GoogleOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    private googleOauthService;
    private configService;
    constructor(googleOauthService: GoogleOauthService, configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User>;
}
export {};
