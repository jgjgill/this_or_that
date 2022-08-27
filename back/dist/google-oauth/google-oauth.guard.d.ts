import { ExecutionContext } from '@nestjs/common';
declare const GoogleOauthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleOauthGuard extends GoogleOauthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
