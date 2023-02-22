/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_sessionId_name_key` ON `User`(`sessionId`, `name`);
