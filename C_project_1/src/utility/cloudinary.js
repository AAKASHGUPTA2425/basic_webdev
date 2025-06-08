import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINORY_NAME,
  api_key: process.env.CLOUDINORY_API_KEY,
  api_secret: process.env.CLOUDINORY_SECRET
});
const uploadCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    //upload the file
    const response = await cloudinary.uploader.upload(localfilepath, { resource_type: "auto" })
    //file uploaded successfully
    // console.log("file is uploaded in cloudinary", response.url);
    fs.unlinkSync(localfilepath)
    return response;


  } catch (error) {
    fs.unlinkSync(localfilepath)//remove thelocally saved temporary file as the upload operation got failed
    return null;
  }


}
export { uploadCloudinary }




/***Cloudinary** is a **cloud-based image and video management platform** used to upload, store, manipulate, optimize, and deliver media (images, videos, etc.) via a Content Delivery Network (CDN).

It's widely used in Node.js apps to manage user-uploaded files efficiently — especially in web apps where performance, optimization, and security of media files matter.

---

## ☁️ Key Features of Cloudinary:

* Image/video **upload and storage**.
* **Automatic optimization** (compression, format conversion).
* **On-the-fly transformations** (resizing, cropping, watermarking, etc.).
* **Fast delivery** via CDN.
* **Secure access** (signed URLs, access control).

---

## 🔧 How to Use Cloudinary in a Node.js App

### 1. **Install Cloudinary SDK**

```bash
npm install cloudinary multer multer-storage-cloudinary
```

### 2. **Set Up Cloudinary Config**

```javascript
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
```

Use `.env` file:

```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📤 Uploading Files (Manually)

```javascript
const cloudinary = require('./config/cloudinary');
const path = require('path');

async function uploadImage(localFilePath) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'my_folder',
      use_filename: true
    });
    console.log('Uploaded:', result.secure_url);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

---

## 📦 Upload via Multer (Express-friendly)

```javascript
// middleware/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

module.exports = upload;
```

---

## ✅ Example Express Route

```javascript
const express = require('express');
const upload = require('./middleware/multer');

const app = express();

app.post('/upload', upload.single('image'), (req, res) => {
  return res.json({
    message: 'Upload successful',
    imageUrl: req.file.path // Cloudinary image URL
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

---

## 🧾 Sample Response:

```json
{
  "message": "Upload successful",
  "imageUrl": "https://res.cloudinary.com/demo/image/upload/v1234567890/uploads/sample.jpg"
}
```

---

## 🧠 When Should You Use Cloudinary?

* You want **CDN-backed image delivery**.
* You need **real-time image transformation** (e.g., resize thumbnails).
* You want to **optimize storage** and **reduce image size**.
* You're building a blog, e-commerce, or social media app with image-heavy content.


*/