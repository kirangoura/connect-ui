const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDatabase } = require('./db/init');
const eventsRouter = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Connect API server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});
