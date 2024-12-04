const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserPosition = async (req, res) => {
  try {
    const { user_id } = req.user;
    console.log("User ID:", user_id);

    const userPositions = await prisma.organisation_User_position.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        user_position: true,
      },
    });

    res.status(200).json(userPositions);
  } catch (error) {
    console.error("Error in getUserPosition:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createUserPosition = async (req, res) => {
  try {
    const { user_position } = req.body; 
    const { organisation_user_id, user_id } = req.user;

    if (!Array.isArray(user_position) || user_position.length === 0) {
      return res
        .status(400)
        .json({ error: "user_position must be a non-empty array" });
    }

    const publicPosition = await prisma.organisation_User_position.findFirst({
      where: {
        organisation_user_id,
        user_position: "PUBLIC",
      },
    });

    if (!publicPosition) {
      await prisma.organisation_User_position.create({
        data: {
          organisation_user_id,
          user_id,
          user_position: "PUBLIC",
        },
      });
    }

    const positionsToAdd = user_position.map((position) => ({
      organisation_user_id,
      user_id,
      user_position: position,
    }));

    const createdPositions = await prisma.organisation_User_position.createMany({
      data: positionsToAdd,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: "User positions added successfully.",
      createdPositions,
    });
  } catch (error) {
    console.error("Error in createUserPosition:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getUserPosition, createUserPosition };
