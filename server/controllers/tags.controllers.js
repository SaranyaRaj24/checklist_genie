const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const getAllTags = async (req,res) => {
    try {
        const tags = await prisma.tags.findMany();
        res.status(200).json(tags)
    } catch (error) {
        console.log(error)
    }
}

const createTags = async (req,res) => {
    try {
        const { tag_name, created_at } = req.body; 
        const userPosition = req.body.userPosition || "DEVELOPER";
        const {organisation_user_id} = req.user;

        
        const newTag = await prisma.tags.create({
            data : {
                tag_name,
                created_at : new Date(),
                user_position : userPosition,
                organisation_user_id
            }
            
        })
        res.status(200).json(newTag)
    } catch (error) {
      console.log(error) 
    }
}


module.exports = {getAllTags, createTags}





