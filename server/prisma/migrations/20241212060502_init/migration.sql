/*
  Warnings:

  - Made the column `tag_id` on table `checklist_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `checklist_items` MODIFY `tag_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `checklist_items` ADD CONSTRAINT `checklist_items_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
