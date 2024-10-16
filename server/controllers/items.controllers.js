const express = require('express')
const {PrismaClient} = require('@prisma/client')
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
        const {checklist_name,tag_id,Instructions} = req.body;
        const {organisation_user_id,organisation_id} = req.user;
        

        const newItem = await prisma.checklist_items.create({
            data : {
                checklist_name,
                tag_id,
                organisation_user_id,
                organisation_id,
                Instructions,
                Input_type : "text",
            }
        })
        res.status(200).json(newItem)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {getAllItems,createItems}










