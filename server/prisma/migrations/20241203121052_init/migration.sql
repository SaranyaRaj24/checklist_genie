-- DropForeignKey
ALTER TABLE `checklist_item_response` DROP FOREIGN KEY `checklist_item_response_checklist_template_linked_items_id_fkey`;

-- DropForeignKey
ALTER TABLE `checklist_item_response` DROP FOREIGN KEY `checklist_item_response_organisation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `checklist_item_response` DROP FOREIGN KEY `checklist_item_response_template_version_fkey`;

-- AlterTable
ALTER TABLE `checklist_item_response` MODIFY `comments` VARCHAR(191) NULL,
    MODIFY `organisation_user_id` INTEGER NULL,
    MODIFY `checklist_template_linked_items_id` INTEGER NULL,
    MODIFY `user_assigned_checklist_template_id` INTEGER NULL,
    MODIFY `template_version` INTEGER NULL,
    MODIFY `selected_date` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_checklist_template_linked_items_id_fkey` FOREIGN KEY (`checklist_template_linked_items_id`) REFERENCES `checklist_template_linked_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_template_version_fkey` FOREIGN KEY (`template_version`) REFERENCES `checklist_template_version`(`version_id`) ON DELETE SET NULL ON UPDATE CASCADE;
