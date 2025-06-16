import express from 'express';
import Link from '../models/link.model.js';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { originalUrl, userId } = req.body;
    const link = new Link({ originalUrl });
    await link.save();

    // עדכון המשתמש – הוספת הקישור החדש למערך שלו
    await User.findByIdAndUpdate(userId, { $push: { links: link._id } });

    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLink);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ error: 'Link not found' });

    await User.updateMany({ links: link._id }, { $pull: { links: link._id } });

    res.json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
