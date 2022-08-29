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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../common/decorators/user.decorator");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findMyInfo(user) {
        return this.userService.findMyInfo({ id: user.id });
    }
    async findProfileInfo(user) {
        return this.userService.findProfileInfo({ userId: user.id });
    }
    async findMyPostInfo(user, postId) {
        return user
            ? this.userService.findMyPostInfo({ userId: user.id, postId })
            : { isLiked: false, isVoted: false, commentIsLikedArray: [] };
    }
    async findMyReCommentInfo(user, commentId) {
        return user
            ? this.userService.findMyReCommentInfo({ userId: user.id, commentId })
            : { reCommentIsLikedArray: [] };
    }
    async findUser(id) {
        return this.userService.findUser({ id });
    }
    async changeName(user, body) {
        return this.userService.changeName({ userId: user.id, newName: body.name });
    }
};
__decorate([
    (0, common_1.Get)('myInfo'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({ summary: '내 정보 찾기', description: '내 정보 찾기' }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyInfo", null);
__decorate([
    (0, common_1.Get)('profileInfo'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({
        summary: '내 프로필 정보',
        description: '내 프로필 정보 불러오기',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findProfileInfo", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: '게시판 내 정보 확인',
        description: '게시판 내 좋아요, 투표 여부 확인하기',
    }),
    (0, swagger_1.ApiQuery)({ name: 'postId', example: 1, required: true }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyPostInfo", null);
__decorate([
    (0, common_1.Get)('me/recomment'),
    (0, swagger_1.ApiOperation)({
        summary: '게시판 대댓글 내 정보 확인',
        description: '게시판 대댓글 내 좋아요 여부 확인하기',
    }),
    (0, swagger_1.ApiQuery)({ name: 'commentId', example: 1, required: true }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('commentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyReCommentInfo", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '유저 찾기', description: '유저 찾기' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, required: true }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Post)('name'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({
        summary: '내 닉네임 변경',
        description: '내 닉네임 변경하기',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeName", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('유저'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map