/*
  Warnings:

  - You are about to drop the column `numberOfStages` on the `CompetitionCategory` table. All the data in the column will be lost.
  - Added the required column `supervisingTeacher` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CompetitionCategory` DROP COLUMN `numberOfStages`;

-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `supervisingTeacher` VARCHAR(191) NOT NULL;
