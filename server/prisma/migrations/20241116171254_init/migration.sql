/*
  Warnings:

  - Added the required column `responded_at` to the `checklist_item_response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist_item_response` ADD COLUMN `responded_at` DATETIME(3) NOT NULL;
