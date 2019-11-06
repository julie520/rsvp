const express = require('express');
const app = express();

const connectDB = require('./config/db');
// connect to database
connectDB();

app.use(express.json({ extended: true }));

// Route
const auth = require('./middleware/auth');
app.use('/users', require('./routes/users'));
app.use('/guests',auth, require('./routes/guests'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
