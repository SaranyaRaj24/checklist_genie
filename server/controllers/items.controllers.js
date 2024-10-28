const express = require('express')
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();





const getAllItems = async (req,res) => {
    try {
        const getItems = await prisma.checklist_items.findMany();
        res.status(200).json(getItems)
    } catch (error) {
        console.log(error)
    }
}

const createItems = async (req,res) => {
    try {
        const {checklist_name,tag_id,Instructions,template_version_id} = req.body;
        const {organisation_user_id,organisation_id} = req.user;
        

        const newItem = await prisma.checklist_items.create({
            data : {
                checklist_name,
                tag_id,
                organisation_user_id,
                organisation_id,
                Instructions,
            }
        })

      const templateVersion = await prisma.checklist_template_version.findFirst({
        where : {
            version_id : template_version_id
        },
        orderBy : {created_at : 'desc'},
      })
          


        const linkedItems = await prisma.checklist_template_linked_items.create({
            data: {
              template_version_id : templateVersion.version_id,
              checklist_item_id: newItem.id,
              created_at: new Date(),
            
            },
          });
        res.status(200).json({newItem,linkedItems})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "error in "})
    }

   
}




module.exports = {getAllItems,createItems}












