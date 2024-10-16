const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTemplate = async (req, res) => {
  try {
    const getTemplate = await prisma.checklist_template.findMany();
    res.status(200).json(getTemplate);
  } catch (error) {
    console.log(error);
  }
};

const createTemplate = async (req, res) => {
  try {
    const { tag_id, template_name, instructions, current_version_id } =
      req.body;

    const priority = req.body.priority || "HIGH";
    const { organisation_id, organisation_user_id } = req.user;

    const existingTag = await prisma.tags.findUnique({
      where: { id: tag_id },
    });

    if (!existingTag) {
      return res.status(404).json({ error: "No Tag found" });
    }

    const existingTemplate = await prisma.checklist_template.findUnique({
      where: { template_name: template_name },
    });

    if (existingTemplate) {
      return res.status(400).json({ error: "Template  already exists." });
    }

    const newTemplate = await prisma.checklist_template.create({
      data: {
        template_name,
        tag_id,
        priority: priority,
        organisation_user_id,
        created_at: new Date(),
        organisation_id,
        current_version_id,
        instructions,
      },
    });

    const newVersion = await prisma.checklist_template_version.create({
      data: {
        checklist_template_id: newTemplate.id,
        organisation_user_id: newTemplate.organisation_user_id,
        created_at: new Date(),
      },
    });


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
      templateOwners
    });
  } catch (error) {
    console.error(error);
  }
};




module.exports = { getAllTemplate, createTemplate };
