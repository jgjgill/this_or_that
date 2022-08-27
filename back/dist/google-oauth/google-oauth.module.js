"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_auth_module_1 = require("../jwt-auth/jwt-auth.module");
const jwt_auth_strategy_1 = require("../jwt-auth/jwt-auth.strategy");
const prisma_service_1 = require("../prisma.service");
const google_oauth_controller_1 = require("./google-oauth.controller");
const google_oauth_service_1 = require("./google-oauth.service");
const google_oauth_strategy_1 = require("./google-oauth.strategy");
const serializer_1 = require("./serializer");
let GoogleOauthModule = class GoogleOauthModule {
};
GoogleOauthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule.register({ session: true }), jwt_auth_module_1.JwtAuthModule],
        controllers: [google_oauth_controller_1.GoogleOauthController],
        providers: [
            google_oauth_service_1.GoogleOauthService,
            google_oauth_strategy_1.GoogleOauthStrategy,
            prisma_service_1.PrismaService,
            serializer_1.Serializer,
            jwt_auth_strategy_1.JwtAuthStrategy,
        ],
    })
], GoogleOauthModule);
exports.GoogleOauthModule = GoogleOauthModule;
//# sourceMappingURL=google-oauth.module.js.map