import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const filePath = process.argv[2];
const fileDir = dirname(filePath); // Get the directory of the markdown file
let content = readFileSync(filePath, 'utf-8');

const regex = /!\[.*?\]\((.*?)\)/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const localImagePath = resolve(fileDir, match[1]); // Resolve the full path of the image
    if (!existsSync(localImagePath)) {
        console.error(`❌ Image not found: ${localImagePath}`);
        continue;
    }
    const uploadResult = await cloudinary.uploader.upload(localImagePath, { folder: 'newsletter' });
    content = content.replace(localImagePath, uploadResult.secure_url);
}

writeFileSync(filePath, content);
console.log('✅ Images uploaded and markdown updated');
