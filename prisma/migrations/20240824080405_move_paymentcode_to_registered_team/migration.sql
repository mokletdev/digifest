/*
  Warnings:

  - You are about to drop the column `paymentCode` on the `competitioncategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentCode]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentCode` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CompetitionCategory` DROP COLUMN `paymentCode`;

-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `paymentCode` INTEGER NOT NULL;
