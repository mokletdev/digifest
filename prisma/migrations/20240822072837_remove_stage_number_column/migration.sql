/*
  Warnings:

  - You are about to drop the column `stageNumber` on the `Stage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Announcement` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Stage` DROP COLUMN `stageNumber`;
