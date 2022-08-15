/*
  Warnings:

  - You are about to drop the column `thatImage` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `thisImage` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `thatImage`,
    DROP COLUMN `thisImage`,
    ADD COLUMN `thatImagePath` VARCHAR(191) NULL,
    ADD COLUMN `thisImagePath` VARCHAR(191) NULL;
