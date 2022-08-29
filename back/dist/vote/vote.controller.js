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
exports.VoteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../common/decorators/user.decorator");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const vote_service_1 = require("./vote.service");
let VoteController = class VoteController {
    constructor(voteService) {
        this.voteService = voteService;
    }
    async createPostVote(postVoteData, user) {
        const { postId, assignedBy } = postVoteData;
        return this.voteService.createPostVote({
            postId,
            userId: user.id,
            assignedBy,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiOperation)({ summary: '투표 기능', description: '투표 기능' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto, Object]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "createPostVote", null);
VoteController = __decorate([
    (0, common_1.Controller)('vote'),
    (0, swagger_1.ApiTags)('투표'),
    __metadata("design:paramtypes", [vote_service_1.VoteService])
], VoteController);
exports.VoteController = VoteController;
//# sourceMappingURL=vote.controller.js.map