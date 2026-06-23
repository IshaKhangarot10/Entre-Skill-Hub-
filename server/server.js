require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000'];
    // Allow if no origin (e.g., mobile apps, curl), or in allowed list, or if it's a Vercel preview URL
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/interests', require('./routes/interests'));
app.use('/api/ideas', require('./routes/ideas'));
app.use('/api/roadmaps', require('./routes/roadmaps'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
