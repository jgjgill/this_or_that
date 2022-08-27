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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(primsa) {
        this.primsa = primsa;
    }
    async findMyInfo({ userId }) {
        return this.primsa.user.findUnique({
            where: { id: userId },
        });
    }
    async findProfileInfo({ userId }) {
        const selectedPostInfo = {
            id: true,
            title: true,
            this: true,
            that: true,
            description: true,
        };
        return this.primsa.user.findUnique({
            where: { id: userId },
            include: {
                comments: true,
                posts: { select: selectedPostInfo },
                _count: { select: { posts: true } },
            },
        });
    }
    async findMyPostInfo({ user, postId }) {
        const isLiked = Boolean(await this.primsa.like.findFirst({
            where: { likeUserId: user.id, likePostId: postId },
            select: { id: true },
        }));
        const isVoted = Boolean(await this.primsa.vote.findFirst({
            where: { userId: user.id, postId },
            select: { postId: true, userId: true },
        }));
        const commets = await this.primsa.comment.findMany({
            where: { commentPostId: postId },
            select: { CommentLike: { select: { likeUserId: true } } },
        });
        const commentIsLikedArray = commets.map((item) => ({
            isLiked: Boolean(item.CommentLike.find((item) => item.likeUserId === user.id)),
        }));
        return { userId: user.id, isLiked, isVoted, commentIsLikedArray };
    }
    async findMyReCommentInfo({ user, commentId }) {
        const reComments = await this.primsa.reComment.findMany({
            where: { reCommentCommentId: commentId },
            select: { ReCommentLike: { select: { likeUserId: true } } },
        });
        const reCommentIsLikedArray = reComments.map((item) => ({
            isLiked: Boolean(item.ReCommentLike.find((item) => item.likeUserId === user.id)),
        }));
        return { reCommentIsLikedArray };
    }
    async findUser(user) {
        return this.primsa.user.findUnique({
            where: { id: user.id },
        });
    }
    async changeName({ userId, newName }) {
        return this.primsa.user.update({
            where: { id: userId },
            data: { name: newName },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map