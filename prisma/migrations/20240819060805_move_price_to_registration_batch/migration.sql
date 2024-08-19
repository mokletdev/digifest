/*
  Warnings:

  - You are about to drop the column `registrationPrice` on the `competitioncategory` table. All the data in the column will be lost.
  - Added the required column `registrationPrice` to the `RegistrationBatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `competitioncategory` DROP COLUMN `registrationPrice`;

-- AlterTable
ALTER TABLE `registrationbatch` ADD COLUMN `registrationPrice` BIGINT NOT NULL;
