/*
  Warnings:

  - Added the required column `phoneNumber` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
