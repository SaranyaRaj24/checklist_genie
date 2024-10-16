const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getLinkedItems = async (req, res) => {
  try {
    const { template_version_id, checklist_item_id } =req.body;
    const linkedItems = await prisma.checklist_template_linked_items.create({
      data: {
        template_version_id,
        checklist_item_id,
        created_at : new Date(),
      },
    });


    
   

    return res.status(200).json({ linkedItems });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
};
module.exports = { getLinkedItems };



