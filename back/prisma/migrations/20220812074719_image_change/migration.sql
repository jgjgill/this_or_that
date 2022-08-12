/*
  Warnings:

  - A unique constraint covering the columns `[imagePath]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thisImage]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thatImage]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `thatImage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `thisImage` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Image_imagePath_key` ON `Image`(`imagePath`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_thisImage_key` ON `Image`(`thisImage`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_thatImage_key` ON `Image`(`thatImage`);
