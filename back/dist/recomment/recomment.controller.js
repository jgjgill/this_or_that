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
exports.RecommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../common/decorators/user.decorator");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const create_reComment_dto_1 = require("./dto/create-reComment.dto");
const recomment_service_1 = require("./recomment.service");
let RecommentController = class RecommentController {
    constructor(recommentService) {
        this.recommentService = recommentService;
    }
    async createReComment(query, reCommentData, user) {
        const { commentId, postId } = query;
        return this.recommentService.createReComment({
            User: { connect: { id: user.id } },
            Post: { connect: { id: postId } },
            Comment: { connect: { id: commentId } },
            content: reCommentData.comment,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '대댓글 생성', description: '대댓글 생성하기' }),
    (0, swagger_1.ApiQuery)({ name: 'postId', example: 1, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'commentId', example: 1, required: true }),
    __param(0, (0, common_1.Query)(common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reComment_dto_1.CreateReCoomentDto, Object]),
    __metadata("design:returntype", Promise)
], RecommentController.prototype, "createReComment", null);
RecommentController = __decorate([
    (0, common_1.Controller)('recomment'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiTags)('대댓글'),
    __metadata("design:paramtypes", [recomment_service_1.RecommentService])
], RecommentController);
exports.RecommentController = RecommentController;
//# sourceMappingURL=recomment.controller.js.map