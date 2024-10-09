-- CreateTable
CREATE TABLE `checklist_item_response` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `organisation_user_id` INTEGER NOT NULL,
    `checklist_template_linked_items_id` INTEGER NOT NULL,
    `user_assigned_checklist_template_id` INTEGER NOT NULL,
    `template_version` INTEGER NOT NULL,
    `input_type` VARCHAR(191) NOT NULL,
    `number_input` INTEGER NOT NULL,
    `text_input` VARCHAR(191) NOT NULL,
    `boolean_input` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_id_fkey` FOREIGN KEY (`id`) REFERENCES `checklist_template_linked_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item_response` ADD CONSTRAINT `checklist_item_response_template_version_fkey` FOREIGN KEY (`template_version`) REFERENCES `checklist_template_version`(`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
