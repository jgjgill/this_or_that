import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';
export declare class GoogleOauthController {
    private readonly jwtAuthService;
    private readonly configService;
    constructor(jwtAuthService: JwtAuthService, configService: ConfigService);
    googleAuth(req: Request): Promise<{
        msg: string;
    }>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    user(req: Request): Promise<{
        user: Express.User;
    }>;
}
