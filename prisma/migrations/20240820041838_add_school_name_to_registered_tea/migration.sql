/*
  Warnings:

  - Added the required column `schoolName` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `schoolName` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'REJECTED', 'ACCEPTED') NOT NULL DEFAULT 'PENDING';
