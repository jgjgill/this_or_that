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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPost({ skip }) {
        return this.prisma.post.findMany({
            include: {
                author: { select: { name: true } },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                        voters: true,
                        ReComment: true,
                    },
                },
            },
            orderBy: { id: 'desc' },
            take: skip + 5,
        });
    }
    async findPost(postId) {
        const thisCount = await this.prisma.vote.count({
            where: {
                postId,
                assignedBy: 'this',
            },
        });
        const thatCount = await this.prisma.vote.count({
            where: {
                postId,
                assignedBy: 'that',
            },
        });
        const postInfo = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: { select: { name: true } },
                comments: {
                    include: {
                        User: { select: { name: true } },
                        ReComment: {
                            include: {
                                User: { select: { name: true } },
                                _count: { select: { ReCommentLike: true } },
                            },
                        },
                        _count: { select: { CommentLike: true } },
                    },
                },
                _count: { select: { voters: true } },
            },
        });
        return Object.assign(Object.assign({}, postInfo), { thisCount, thatCount });
    }
    async createPost(postData) {
        return this.prisma.post.create({ data: postData });
    }
    async deletePost(id) {
        return this.prisma.post.delete({
            where: id,
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map