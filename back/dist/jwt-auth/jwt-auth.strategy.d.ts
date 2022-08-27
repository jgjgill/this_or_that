import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        name: any;
    }>;
}
export {};
