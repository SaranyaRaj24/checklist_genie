const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTemplate = async (req, res) => {
  try {
    const getTemplate = await prisma.checklist_template.findMany({
      include: {
        Tags: true, 
      },
    });
    res.status(200).json(getTemplate);
  } catch (error) {
    console.log(error);
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
      where: {
        id: newTemplate.id,
      },
      data: {
        current_version_id: newVersion.version_id,
      },
    });

    const templateOwners = await prisma.checklist_template_owners.create({
      data: {
        checklist_template_id: newTemplate.id,
        organisation_user_id: newTemplate.organisation_user_id,
        created_at: new Date(),
      },
    });

    return res.status(201).json({
      message: "New template created with item",
      newTemplate,
      newVersion,
      updatedTemplate,
      templateOwners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create template or add item." });
  }
};

const getTemplatesByTags = async (req, res) => {
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
    res.status(500).json({ message: "Failed to fetch templates." });
  }
};

const getTagsbyTemplates = async (req, res) => {
  try {
    const { organisation_user_id } = req.user;
    const tagByTemplates = await prisma.tags.findMany({
      where: {
        organisation_user_id: organisation_user_id,
      },
      include: {
        ChecklistTemplate: true,
      },
    });
    res.status(200).json({
      message: "Successfully fetched the tags and templates ",
      tagByTemplates,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Fetching error " });
  }
};

const getTemplatesForUserPositions = async (req, res) => {
  try {
    const { organisation_user_id } = req.user;

    const organisationUser = await prisma.organisation_Users.findUnique({
      where: { id: organisation_user_id },
      select: { organisation_id: true },
    });

    if (!organisationUser) {
      return res.status(200).json({ message: "Organisation user not found.",templates:[], tags:[] });
    }

    const { organisation_id } = organisationUser;

    const userPositionss = await prisma.organisation_User_position.findMany({
      where: { organisation_user_id },
      select: { user_position: true },
    });

    const user_position = userPositionss.map((pos) => pos.user_position);

    if (user_position.length === 0) {
      return res
        .status(200)
        .json({ message: "No positions found for this user.",templates:[], tags:[] });
    }

    const tags = await prisma.tags.findMany({
      where: {
        user_position: { in: user_position },
      },

      select: {
        id: true,
        tag_name: true,
        OrganisationUsers: {
          select: {
            organisation_id: true,
          },
        },
      },
    });

    if (tags.length === 0) {
      return res
        .status(200)
        .json({ message: "No tags found for the user positions.",templates:[], tags:[] });
    }

    const filteredTags = tags.filter(tag => tag.OrganisationUsers.organisation_id === organisation_id);


    const tagIds = filteredTags.map((tag) => tag.id);

    if (tagIds.length === 0) {
      return res
        .status(200)
        .json({ message: "No tags found for the user positions.",templates:[], tags:[] });
    }

    const templates = await prisma.checklist_template.findMany({
      where: { tag_id: { in: tagIds } },
    });

    res.status(200).json({ templates, tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch templates." });
  }
};

module.exports = {
  getAllTemplate,
  createTemplate,
  getTemplatesByTags,
  getTagsbyTemplates,
  getTemplatesForUserPositions,
};
