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

const createTemplate = async (req,res) => 
  {
  try {
    const { tag_id, template_name } =
      req.body;

    const priority = req.body.priority || "HIGH";
    const { organisation_id, organisation_user_id } = req.user;

  

    const newTemplate = await prisma.checklist_template.create({
      data: {
        template_name,
        tag_id  ,
        priority: priority,
        organisation_user_id,
        created_at: new Date(),
        organisation_id,
      }       
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
      newTemplate,
      newVersion,
      updatedTemplate,
      templateOwners
    });
  } catch (error) {
    console.error(error);
  }
};

const getTemplatesByTags  = async (req, res) => {
  try {
    const { organisation_user_id } = req.user;

    const templates = await prisma.checklist_template.findMany({
      where: {
        organisation_user_id: organisation_user_id,
      },
      include: {
        Tags: true, 
      },
    });

    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch templates.' });
  }
};



module.exports = { getAllTemplate, createTemplate,
  getTemplatesByTags 
 };
