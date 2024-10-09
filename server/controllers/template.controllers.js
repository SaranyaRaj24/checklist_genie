const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const getAllTemplate = async (req,res) => {
    try {
        const getTemplate = await prisma.checklist_template.findMany();
        res.status(200).json(getTemplate)
    } catch (error) {
       console.log(error) 
    }
}

const createTemplate = async (req, res) => {
    try {
        const {tag_id, template_name, instructions,current_version_id } = req.body;
        const priority = req.body.priority || "HIGH";
        const {organisation_id,organisation_user_id} = req.user;
        const newTemplate = await prisma.checklist_template.create({
            data: {
                
                template_name,
                tag_id,
                priority: priority,
                organisation_user_id,
                created_at: new Date(),
                organisation_id,
                current_version_id,
                instructions
            }
        });

        res.status(200).json(newTemplate);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {getAllTemplate,createTemplate}