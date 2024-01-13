const express = require('express');
const multer = require('multer');


const app = express();
const port = 3000;

// Set up storage for uploaded files using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// Create a Multer instance with the specified storage
const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

// Handle file uploads using the /upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Check if a file was successfully uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Log successful file upload and send a response
    console.log('File uploaded successfully:', req.file.originalname);
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    // Handle errors during file upload and send an error response
    console.error('Error uploading file', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
