-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_stageId_fkey`;

-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Competition` DROP FOREIGN KEY `Competition_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CompetitionCategory` DROP FOREIGN KEY `CompetitionCategory_competitionId_fkey`;

-- DropForeignKey
ALTER TABLE `Registration` DROP FOREIGN KEY `Registration_registrationBatchId_fkey`;

-- DropForeignKey
ALTER TABLE `Registration` DROP FOREIGN KEY `Registration_userId_fkey`;

-- DropForeignKey
ALTER TABLE `RegistrationBatch` DROP FOREIGN KEY `RegistrationBatch_competitionCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Stage` DROP FOREIGN KEY `Stage_competitionCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamMember` DROP FOREIGN KEY `TeamMember_registrationId_fkey`;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_registrationBatchId_fkey` FOREIGN KEY (`registrationBatchId`) REFERENCES `RegistrationBatch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_registrationId_fkey` FOREIGN KEY (`registrationId`) REFERENCES `Registration`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competition` ADD CONSTRAINT `Competition_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompetitionCategory` ADD CONSTRAINT `CompetitionCategory_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `Competition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_competitionCategoryId_fkey` FOREIGN KEY (`competitionCategoryId`) REFERENCES `CompetitionCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistrationBatch` ADD CONSTRAINT `RegistrationBatch_competitionCategoryId_fkey` FOREIGN KEY (`competitionCategoryId`) REFERENCES `CompetitionCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
