-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `checklist_template` DROP FOREIGN KEY `checklist_template_organisation_user_id_fkey`;

-- AlterTable
ALTER TABLE `checklist_template` MODIFY `organisation_user_id` INTEGER NULL,
    MODIFY `organisation_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
