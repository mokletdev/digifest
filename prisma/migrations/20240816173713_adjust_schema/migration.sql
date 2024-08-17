/*
  Warnings:

  - Added the required column `userId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxMemberCount` to the `CompetitionCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minMemberCount` to the `CompetitionCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `competitioncategory` ADD COLUMN `maxMemberCount` INTEGER NOT NULL,
    ADD COLUMN `minMemberCount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stage` ADD COLUMN `endDate` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
