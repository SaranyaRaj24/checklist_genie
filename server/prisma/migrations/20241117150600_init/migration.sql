/*
  Warnings:

  - Added the required column `input_type` to the `checklist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Instructions` to the `checklist_template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist_items` ADD COLUMN `input_type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `checklist_template` ADD COLUMN `Instructions` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `type` VARCHAR(191) NOT NULL;
