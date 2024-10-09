/*
  Warnings:

  - Made the column `checklist_name` on table `checklist_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organisation_user_id` on table `checklist_template` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organisation_id` on table `checklist_template` required. This step will fail if there are existing NULL values in that column.
  - Made the column `current_version_id` on table `checklist_template` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organisation_user_id` on table `tags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_organisation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_organisation_user_id_fkey`;

-- AlterTable
ALTER TABLE `checklist_items` MODIFY `checklist_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `checklist_template` MODIFY `organisation_user_id` INTEGER NOT NULL,
    MODIFY `organisation_id` INTEGER NOT NULL,
    MODIFY `current_version_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tags` MODIFY `organisation_user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
