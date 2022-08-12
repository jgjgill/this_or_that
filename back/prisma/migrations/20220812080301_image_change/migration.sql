/*
  Warnings:

  - You are about to drop the column `thatImage` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `thisImage` on the `image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Image_imagePath_key` ON `image`;

-- DropIndex
DROP INDEX `Image_thatImage_key` ON `image`;

-- DropIndex
DROP INDEX `Image_thisImage_key` ON `image`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `thatImage`,
    DROP COLUMN `thisImage`,
    ADD COLUMN `isThatImage` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isThisImage` BOOLEAN NOT NULL DEFAULT false;
