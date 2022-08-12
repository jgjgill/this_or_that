/*
  Warnings:

  - You are about to drop the column `thatImage` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `thisImage` on the `image` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `thatImage`,
    DROP COLUMN `thisImage`,
    ADD COLUMN `imagePath` VARCHAR(191) NOT NULL;
