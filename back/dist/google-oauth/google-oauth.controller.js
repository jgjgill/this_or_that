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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
const jwt_auth_service_1 = require("../jwt-auth/jwt-auth.service");
const google_oauth_guard_1 = require("./google-oauth.guard");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
let GoogleOauthController = class GoogleOauthController {
    constructor(jwtAuthService, configService) {
        this.jwtAuthService = jwtAuthService;
        this.configService = configService;
    }
    async googleAuth(req) {
        return { msg: 'google auth' };
    }
    async googleAuthRedirect(req, res) {
        const { accessToken } = this.jwtAuthService.login(req.user);
        if (req.session) {
            res.cookie('jwt', accessToken, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.redirect(this.configService.get('CLIENT_URL'));
        }
        else {
            res.redirect(this.configService.get('LOGIN_URL'));
        }
    }
    async logout(req, res) {
        res.clearCookie('jwt');
        req.session.destroy(() => {
            console.log('session destroy');
        });
        console.log('logout');
    }
    async user(req) {
        return { user: req.user };
    }
};
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "user", null);
GoogleOauthController = __decorate([
    (0, common_1.Controller)('auth/google'),
    __metadata("design:paramtypes", [jwt_auth_service_1.JwtAuthService,
        config_1.ConfigService])
], GoogleOauthController);
exports.GoogleOauthController = GoogleOauthController;
//# sourceMappingURL=google-oauth.controller.js.map