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
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findMyInfo(user) {
        return this.userService.findMyInfo({ userId: user.id });
    }
    async findProfileInfo(user) {
        console.log(user);
        return this.userService.findProfileInfo({ userId: user.id });
    }
    async findMyPostInfo(user, postId) {
        return user
            ? this.userService.findMyPostInfo({ user, postId: Number(postId) })
            : { isLiked: false, isVoted: false, commentIsLikedArray: [] };
    }
    async findMyReCommentInfo(user, commentId) {
        const NumCommentId = Number(commentId);
        return user
            ? this.userService.findMyReCommentInfo({ user, commentId: NumCommentId })
            : { reCommentIsLikedArray: [] };
    }
    async findUser(id) {
        return this.userService.findUser({ id: Number(id) });
    }
    async changeName(user, body) {
        return this.userService.changeName({ userId: user.id, newName: body.name });
    }
};
__decorate([
    (0, common_1.Get)('myInfo'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyInfo", null);
__decorate([
    (0, common_1.Get)('profileInfo'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findProfileInfo", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyPostInfo", null);
__decorate([
    (0, common_1.Get)('me/recomment'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMyReCommentInfo", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Post)('name'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeName", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map