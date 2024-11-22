const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTemplate = async (req, res) => {
  try {
    const getTemplate = await prisma.checklist_template.findMany();
    res.status(200).json(getTemplate);
  } catch (error) {
    console.log(error)
  }
};




const createTemplate = async (req, res) => {
  try {
    const { tag_id, template_name } = req.body; 
    const priority = req.body.priority || "HIGH";
    const { organisation_id, organisation_user_id } = req.user;

  


      
      const newTemplate = await prisma.checklist_template.create({
        data: {
          template_name,
          tag_id,
          priority,
          organisation_user_id,
          created_at: new Date(),
          organisation_id,
        },
      });

      const newVersion = await prisma.checklist_template_version.create({
              data: {
                checklist_template_id: newTemplate.id,
                organisation_user_id: newTemplate.organisation_user_id,
                created_at: new Date(),
              },
          });
               const updatedTemplate = await prisma.checklist_template.update({
                where  : {
                  id : newTemplate.id
                },
                data : {
                  current_version_id : newVersion.version_id
                }
               })
      
               const templateOwners = await prisma.checklist_template_owners.create({
                     data :{
                        checklist_template_id : newTemplate.id,
                        organisation_user_id : newTemplate.organisation_user_id,
                        created_at : new Date(),
                    }
                })
                

      return res.status(201).json({
        message: "New template created with item",
        newTemplate,
        newVersion,
        updatedTemplate,
        templateOwners
      });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create template or add item." });
  }
};


const getTemplatesByTags  = async (req, res) => {
  try {

    console.log("Inside theeeeee get templste by tags")
    const { organisation_user_id } = req.user;
    console.log( "organisation user id : " ,organisation_user_id)

    const templates = await prisma.checklist_template.findMany({
      where: {
        organisation_user_id: organisation_user_id,
      },
      include: {
        Tags: true, 
      },
    });
       console.log(templates,"No templates")
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch templates.' });
  }
};




const getTagsbyTemplates = async (req,res) => {
  try {
    const {organisation_user_id} = req.user;
    const tagByTemplates = await prisma.tags.findMany({
      where : {
        organisation_user_id : organisation_user_id
      },
      include : {
        ChecklistTemplate : true
      }
    })
    res.status(200).json({message : "Successfully fetched the tags and templates ", tagByTemplates})
  } catch (error) {
    console.log(error )
    res.status(401).json({error : "Fetching error "})
  }
}


module.exports = { getAllTemplate, createTemplate, getTemplatesByTags,getTagsbyTemplates };
