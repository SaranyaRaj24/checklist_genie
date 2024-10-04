
const express = require('express');
const taskRoutes = require('./Routes/taskRoutes');
const app = express();

app.use(express.json());


app.use('/api', taskRoutes);


const PORT =  5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
