const express = require('express');
const app = express();

const connectDB = require('./config/db');
// connect to database
connectDB();

app.use(express.json({ extended: true }));

// Route
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));