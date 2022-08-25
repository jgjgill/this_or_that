-- CreateTable
CREATE TABLE `ReCommentLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `likeUserId` INTEGER NOT NULL,
    `likeReCommentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reCommentUserId` INTEGER NOT NULL,
    `reCommentCommentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReCommentLike` ADD CONSTRAINT `ReCommentLike_likeUserId_fkey` FOREIGN KEY (`likeUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReCommentLike` ADD CONSTRAINT `ReCommentLike_likeReCommentId_fkey` FOREIGN KEY (`likeReCommentId`) REFERENCES `ReComment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReComment` ADD CONSTRAINT `ReComment_reCommentUserId_fkey` FOREIGN KEY (`reCommentUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReComment` ADD CONSTRAINT `ReComment_reCommentCommentId_fkey` FOREIGN KEY (`reCommentCommentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
