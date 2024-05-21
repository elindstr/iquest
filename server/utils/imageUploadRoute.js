const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { User } = require('../models');

// set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// endpoint
router.post('/upload', upload.single('profilePicture'), async (req, res) => {
  console.log(req)

  try {
    const userId = req.body.userId;
    const filePath = `/uploads/${req.file.filename}`;
    
    // update db
    await User.findByIdAndUpdate(userId, { profilePictureURL: filePath });

    res.json({ success: true, filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
