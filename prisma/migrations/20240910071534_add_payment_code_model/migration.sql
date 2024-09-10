-- AlterTable
ALTER TABLE `Registration` MODIFY `paymentCode` INTEGER NULL;

-- CreateTable
CREATE TABLE `PaymentCode` (
    `paymentCode` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` VARCHAR(191) NULL,
    `expiredAt` DATETIME(3) NULL,

    UNIQUE INDEX `PaymentCode_teamId_key`(`teamId`),
    PRIMARY KEY (`paymentCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentCode` ADD CONSTRAINT `PaymentCode_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Registration`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
