/*
  Warnings:

  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `verificationToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
