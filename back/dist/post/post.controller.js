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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async findAllPost(skip) {
        return this.postService.findAllPost({ skip: skip });
    }
    async findPost(postId) {
        return this.postService.findPost(postId);
    }
    async createPost(post) {
        const { authorId } = post, newPost = __rest(post, ["authorId"]);
        return this.postService.createPost(Object.assign(Object.assign({}, newPost), { author: { connect: { id: authorId } } }));
    }
    async deletePost(postId) {
        return this.postService.deletePost({ id: postId });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '전체 게시판',
        description: '모든 게시판 불러오기(무한 스크롤)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'skip', example: 5, required: true }),
    __param(0, (0, common_1.Query)('skip', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAllPost", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '특정 게시판', description: '특정 게시판 불러오기' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, required: true }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPost", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({ summary: '게시판 생성', description: '게시판 생성하기' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({ summary: '게시판 삭제', description: '게시판 삭제하기' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, required: true }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    (0, swagger_1.ApiTags)('게시판'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map