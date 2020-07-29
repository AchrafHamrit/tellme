const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

app.get('/', (req, res) => res.send('it works!!'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started, port: ${PORT}`));
