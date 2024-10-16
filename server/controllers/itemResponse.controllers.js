const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getItemResponses = async (req, res) => {
    try {
        
            const itemResponse = await prisma.checklist_item_response.findMany();
            
       

     return res.status(200).json(itemResponse);
    } catch (error) {
        console.error('Error creating item response:', error);
        return res.status(500).json({ error: 'Error creating item response' });
    }
};

const updateItemResponse  = async (req,res) => {
    try {
        const {comments,checklist_template_linked_items_id, user_assigned_checklist_template_id,template_version} = req.body;
          const {organisation_user_id} = req.user;

           const updatingItems = await prisma.checklist_item_response.upsert({
            where : {
                checklist_template_linked_items_id,
                template_version,
            },
            update : {
                checklist_template_linked_items_id,
                template_version,
            },
            create : {
                status : true,
                organisation_user_id,
                comments,
                  checklist_template_linked_items_id,
                  user_assigned_checklist_template_id,
                  template_version
            }
           })


      
        return res.status(200).json({ message: ' Updated Successfully', updatingItems });

    } catch (error) {
        console.log(error)
    }
}





module.exports = { getItemResponses , updateItemResponse};




