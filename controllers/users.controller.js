import User from '../models/User.js';

const UsersController = {
  // שליפת כל המשתמשים
  getList: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // שליפה לפי מזהה
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // יצירת משתמש חדש
  create: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await User.create({ name, email });
      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // עדכון משתמש לפי מזהה
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // מחיקת משתמש לפי מזהה
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json(deletedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
};

export default UsersController;
