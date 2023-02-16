/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_code_key` ON `Session`(`code`);
