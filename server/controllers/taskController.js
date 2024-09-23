const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong' });
  }
};


exports.createTask = async (req, res) => {
    const { email,name } = req.body;
  
    try {
      const newTask = await prisma.task.create({
        data: {email,name },
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  };
  


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {email, name } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { email,name },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

