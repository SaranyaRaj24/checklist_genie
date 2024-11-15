/*
  Warnings:

  - A unique constraint covering the columns `[template_name]` on the table `checklist_template` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `checklist_template_template_name_key` ON `checklist_template`(`template_name`);
