-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_tag_id_fkey`;

-- AlterTable
ALTER TABLE `checklist_template` MODIFY `tag_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
