-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_tag_id_fkey`;

-- AlterTable
ALTER TABLE `organisation_users` MODIFY `user_type` VARCHAR(191) NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
