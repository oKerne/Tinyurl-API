import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import linkRoutes from './routes/links.js';
import redirectRoutes from './routes/redirect.js';
import authenticateToken from './middleware/authMiddleware.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api', authenticateToken);
app.use('/', redirectRoutes); 

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
