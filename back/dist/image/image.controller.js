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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_service_1 = require("./image.service");
const multer_1 = require("multer");
const fs = require("fs");
const path = require("path");
const logged_in_guard_1 = require("../jwt-auth/logged-in.guard");
const swagger_1 = require("@nestjs/swagger");
try {
    fs.readdirSync('uploads');
}
catch (err) {
    console.error('uploads 폴더 생성');
    fs.mkdirSync('uploads');
    fs.mkdirSync('uploads/this');
    fs.mkdirSync('uploads/that');
}
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async findLastImage() {
        return this.imageService.findLastImage();
    }
    async createThisImage(file) {
        const imagePath = file.path;
        return this.imageService.createThisImage({
            imagePath,
        });
    }
    async createThatImage(file) {
        const imagePath = file.path;
        return this.imageService.createThatImage({
            imagePath,
        });
    }
};
__decorate([
    (0, common_1.Get)('-1'),
    (0, swagger_1.ApiOperation)({
        summary: '등록 이미지 가져오기',
        description: '사용자가 마지막으로 등록한 이미지 불러오기',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "findLastImage", null);
__decorate([
    (0, common_1.Post)('this_image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination(req, file, cb) {
                cb(null, 'uploads/this');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fieldSize: 5 * 1024 * 1024 },
    })),
    (0, swagger_1.ApiOperation)({
        summary: 'This Image 생성',
        description: 'This Image 저장',
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "createThisImage", null);
__decorate([
    (0, common_1.Post)('that_image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination(req, file, cb) {
                cb(null, 'uploads/that');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fieldSize: 5 * 1024 * 1024 },
    })),
    (0, swagger_1.ApiOperation)({
        summary: 'That Image 생성',
        description: 'That Image 저장',
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "createThatImage", null);
ImageController = __decorate([
    (0, common_1.Controller)('image'),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, swagger_1.ApiTags)('이미지'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map