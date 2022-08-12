/*
  Warnings:

  - You are about to drop the column `isThatImage` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `isThisImage` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `isThatImage`,
    DROP COLUMN `isThisImage`;
