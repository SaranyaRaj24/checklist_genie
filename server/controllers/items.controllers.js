const express = require("express");
const { PrismaClient, inputType } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
  try {
    const getItems = await prisma.checklist_items.findMany();
    res.status(200).json(getItems);
  } catch (error) {
    console.log(error);
  }
};


const createItems = async (req, res) => {
  try {
    const { checklist_name, tag_id, Instructions, template_version_id,input_type } =
      req.body;
    const { organisation_user_id, organisation_id } = req.user;

    
    




    const newItem = await prisma.checklist_items.create({
      data: {
        checklist_name,
        tag_id,
        organisation_user_id,
        organisation_id,
        Instructions,
        input_type, 
      },
    });

    const templateVersion = await prisma.checklist_template_version.findFirst({
      where: {
        version_id: template_version_id,
      },
      orderBy: { created_at: "desc" },
    });

    const linkedItems = await prisma.checklist_template_linked_items.create({
      data: {
        template_version_id: templateVersion.version_id,
        checklist_item_id: newItem.id,
        created_at: new Date(),
      },
    });

    res.status(200).json({ newItem, linkedItems });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating checklist item." });
  }
};

const getItemsByTemplate = async (req, res) => {
  try {
    console.log("tag id", req.params.tag_id)
    const {tag_id} = req.params;

    const items = await prisma.checklist_items.findMany({
      where: {
        tag_id : parseInt(tag_id)
      },
      include : {
        ChecklistTemplateLinkedItems : {
          select : {
            id:true,
            checklist_item_id:true,
            template_version_id:true
          }
        }
      }
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch checklist items.'});
  }
};

const addExtraItems = async(req,res) => {
  try {
    const {checklist_name,Instructions,template_version_id,input_type} = req.body;
    const {organisation_user_id,organisation_id} = req.user;
    const {tag_id} = req.params;

    const extraItems = await prisma.checklist_items.create({
      data : {
        checklist_name,
        organisation_user_id,
        tag_id : parseInt(tag_id),
        organisation_id,
        Instructions,
        input_type
          
      }
    })
    const templateVersion = await prisma.checklist_template_version.findFirst({
      where: {
        version_id: template_version_id,
      },
      orderBy: { created_at: "desc" },
    });

    const linkedItems = await prisma.checklist_template_linked_items.create({
      data: {
        template_version_id: templateVersion.version_id,
        checklist_item_id:extraItems.id,
        created_at: new Date(),
      },
    });
    res.status(200).json({
      message: "New item created",
      extraItems,
      templateVersion,
      linkedItems
    });
      } catch (error) {
    console.log(error)
    res.status(404).json({error : "No items added "})
  }
}








module.exports = { getAllItems, createItems,getItemsByTemplate,addExtraItems};
