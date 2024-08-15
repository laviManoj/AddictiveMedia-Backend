const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const authRoutes = require('./routers/authRoutes.js');
const accountRoutes = require('./routers/accountRoutes.js')
const mediaUpload = require('./routers/vediouploadRoutes.js')


const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', // or specify allowed origins like ['https://example.com', 'https://another.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // if needed
}));

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', accountRoutes);
app.use('/api/media', mediaUpload )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;