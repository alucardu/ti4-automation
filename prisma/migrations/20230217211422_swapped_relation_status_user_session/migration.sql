/*
  Warnings:

  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `sessionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
