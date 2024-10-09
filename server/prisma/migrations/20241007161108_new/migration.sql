-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_organisation_user_id_fkey`;

-- AlterTable
ALTER TABLE `tags` MODIFY `organisation_user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
