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
exports.Serializer = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const google_oauth_service_1 = require("./google-oauth.service");
let Serializer = class Serializer extends passport_1.PassportSerializer {
    constructor(googleOauthService) {
        super();
        this.googleOauthService = googleOauthService;
    }
    serializeUser(user, done) {
        done(null, user);
    }
    async deserializeUser(payload, done) {
        const user = await this.googleOauthService.findUser(payload.id);
        return user ? await done(null, user) : await done(null, null);
    }
};
Serializer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_oauth_service_1.GoogleOauthService])
], Serializer);
exports.Serializer = Serializer;
//# sourceMappingURL=serializer.js.map