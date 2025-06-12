import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});

const User = mongoose.model('User', userSchema);

export default User;
