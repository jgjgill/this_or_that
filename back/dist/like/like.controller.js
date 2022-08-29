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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../common/decorators/user.decorator");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const toggle_like_dto_1 = require("./dto/toggle-like-dto");
const like_service_1 = require("./like.service");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async updatePostLike(postData, user) {
        const { postId } = postData;
        return this.likeService.updatePostLike({ postId, userId: user.id });
    }
    async updateCommentLike(commentId, user) {
        return this.likeService.updateCommentLike({
            commentId: commentId,
            userId: user.id,
        });
    }
    async updateReCommentLike(reCommentId, user) {
        return this.likeService.updateReCommentLike({
            reCommentId: reCommentId,
            userId: user.id,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '게시판 좋아요 기능',
        description: '게시판 좋아요 토글 이벤트',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toggle_like_dto_1.TogglePostLikeDto, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "updatePostLike", null);
__decorate([
    (0, common_1.Post)('comment'),
    (0, swagger_1.ApiOperation)({
        summary: '댓글 좋아요 기능',
        description: '댓글 좋아요 토글 이벤트',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'commentId',
        example: 1,
        required: true,
    }),
    __param(0, (0, common_1.Query)('commentId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "updateCommentLike", null);
__decorate([
    (0, common_1.Post)('reComment'),
    (0, swagger_1.ApiOperation)({
        summary: '대댓글 좋아요 기능',
        description: '대댓글 좋아요 토글 이벤트',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'reCommentId',
        example: 1,
        required: true,
    }),
    __param(0, (0, common_1.Query)('reCommentId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "updateReCommentLike", null);
LikeController = __decorate([
    (0, common_1.Controller)('like'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiTags)('좋아요'),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map