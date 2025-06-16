import Link from '../models/link.model.js';

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortId } = req.params;
    const link = await Link.findOne({ shortId });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // הוספת קליק עם תאריך וכתובת IP
    link.clicks.push({
      ipAddress: req.ip, 
    });

    await link.save();

    return res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
