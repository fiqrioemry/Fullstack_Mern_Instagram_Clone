const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
  secure: true,
});

async function uploadMediaToCloudinary(buffer, mimetype) {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: process.env.CLOUD_FOLDER,
            transformation: [
              {
                width: 500,
                height: 500,
                crop: 'limit',
                format: 'webp',
              },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary: ' + error.message);
  }
}

async function deleteMediaFromCloudinary(imageUrl) {
  try {
    const publicId = imageUrl.split('/').slice(-1).join('/').split('.').shift();
    await cloudinary.uploader.destroy(
      `${process.env.CLOUD_FOLDER}/${publicId}`,
    );
  } catch (error) {
    throw new Error('Failed to delete asset from Cloudinary');
  }
}

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
