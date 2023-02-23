-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_sessionId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
