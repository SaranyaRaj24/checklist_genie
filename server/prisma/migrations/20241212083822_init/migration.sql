/*
  Warnings:

  - You are about to drop the `_checklist_itemstochecklist_template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_checklist_itemstochecklist_template` DROP FOREIGN KEY `_checklist_itemsTochecklist_template_A_fkey`;

-- DropForeignKey
ALTER TABLE `_checklist_itemstochecklist_template` DROP FOREIGN KEY `_checklist_itemsTochecklist_template_B_fkey`;

-- DropTable
DROP TABLE `_checklist_itemstochecklist_template`;

-- CreateTable
CREATE TABLE `_TemplateItems` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TemplateItems_AB_unique`(`A`, `B`),
    INDEX `_TemplateItems_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TemplateItems` ADD CONSTRAINT `_TemplateItems_A_fkey` FOREIGN KEY (`A`) REFERENCES `checklist_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TemplateItems` ADD CONSTRAINT `_TemplateItems_B_fkey` FOREIGN KEY (`B`) REFERENCES `checklist_template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
