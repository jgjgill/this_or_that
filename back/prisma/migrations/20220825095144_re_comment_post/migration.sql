/*
  Warnings:

  - Added the required column `reCommentId` to the `ReComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reCommentPostId` to the `ReComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recomment` ADD COLUMN `reCommentId` INTEGER NOT NULL,
    ADD COLUMN `reCommentPostId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ReComment` ADD CONSTRAINT `ReComment_reCommentPostId_fkey` FOREIGN KEY (`reCommentPostId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
