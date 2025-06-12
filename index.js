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
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
