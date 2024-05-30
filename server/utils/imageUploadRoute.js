const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User } = require('../models');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../client/public/uploads');
    console.log(`Upload path: ${uploadPath}`);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log(`Filename: ${filename}`);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// File upload endpoint
router.post('/upload', upload.single('profilePicture'), async (req, res) => {
  console.log('Received file upload request');
  try {
    const userId = req.body.userId;
    const filePath = `/uploads/${req.file.filename}`;
    
    // Update user profile with the image URL
    await User.findByIdAndUpdate(userId, { profilePictureURL: filePath });

    console.log(`File uploaded to: ${filePath}`);

    res.json({ success: true, filePath });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
