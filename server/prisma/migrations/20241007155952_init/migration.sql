/*
  Warnings:

  - You are about to drop the column `user_positon` on the `tags` table. All the data in the column will be lost.
  - Added the required column `user_position` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tags` DROP COLUMN `user_positon`,
    ADD COLUMN `user_position` ENUM('DEVELOPER', 'POWER_BI', 'SALESFORCE', 'TESTER', 'GRAPHIC_DESIGNER') NOT NULL;
