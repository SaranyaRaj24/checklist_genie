// const express = require("express");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const getLinkedItems = async (req, res) => {
//   try {
//     const { template_version_id, checklist_item_id } = req.body;
    
//     // Debugging logs to check received IDs
//     console.log("Template Version ID:", template_version_id);
//     console.log("Checklist Item ID:", checklist_item_id);

//     // Find template version
//     const templateVersion = await prisma.checklist_template_version.findFirst({
//       where: { version_id: template_version_id },
//     });

//     if (!templateVersion) {
//       return res.status(404).json({ error: "Template version not found" });
//     }

//     // Find checklist item
//     const checklistItem = await prisma.checklist_items.findFirst({
//       where: { id: checklist_item_id },
//     });

//     if (!checklistItem) {
//       return res.status(404).json({ error: "Checklist item not found" });
//     }

//     // Create linked item record
//     const linkedItems = await prisma.checklist_template_linked_items.create({
//       data: {
//         template_version_id: templateVersion.version_id,
//         checklist_item_id: checklistItem.id,
//         created_at: new Date(),
//       },
//     });

//     // Return created linked items
//     return res.status(200).json({ linkedItems });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
// module.exports = { getLinkedItems };



