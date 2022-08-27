import { JwtService } from '@nestjs/jwt';
export declare class JwtAuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: any): {
        accessToken: string;
    };
}
