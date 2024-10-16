const express = require('express');
const {PrismaClient, userPosition} = require('@prisma/client');
const prisma = new PrismaClient ();


const getUserPosition = async (req,res) => {
    try {
       const {userId} = req.user;
       
       const userPositions = await prisma.organisation_User_position.findMany({
        where : {
            user_id : userId,
        }
       })
         res.status(200).json(userPositions)
         
    } catch (error) {
        console.log(error)
    }
}
  const createUserPosition = async (req,res) => {
    try {

        const {user_position} = req.body;
        const {organisation_user_id,user_id} = req.user;
  const newPositions = await prisma.organisation_User_position.upsert({
    where : {
      organisation_user_id_user_id : {
      organisation_user_id,
      user_id,
      },
    },
    update : {
      user_position,
      created_at : new Date(),
    },
    create : {
      organisation_user_id,
      user_id,
      user_position,
      created_at : new Date(),
    }
  })

    return  res.status(200).json(newPositions)
    } catch (error) {
        console.log(error)
        
    }
  }       


module.exports = {getUserPosition,createUserPosition}