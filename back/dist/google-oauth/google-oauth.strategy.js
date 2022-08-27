"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const google_oauth_service_1 = require("./google-oauth.service");
let GoogleOauthStrategy = class GoogleOauthStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(googleOauthService, configService) {
        super({
            clientID: configService.get('GOOGLE_OAUTH_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_OAUTH_OAUTH_CLIENT_SECRET'),
            callbackURL: `${configService.get('BASE_URL')}/auth/google/redirect`,
            scope: ['profile', 'email'],
        });
        this.googleOauthService = googleOauthService;
        this.configService = configService;
    }
    async validate(accessToken, refreshToken, profile) {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const user = await this.googleOauthService.validate({
            email,
            name,
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
GoogleOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_oauth_service_1.GoogleOauthService,
        config_1.ConfigService])
], GoogleOauthStrategy);
exports.GoogleOauthStrategy = GoogleOauthStrategy;
//# sourceMappingURL=google-oauth.strategy.js.map