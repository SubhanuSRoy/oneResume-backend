// src/controllers/uploadController.js
const storage = require('../firebase');

const uploadFile = async (file, user_id) => {
    try {
        const bucket = storage.bucket();
        const fileBlob = bucket.file(`resumes/${user_id}_resume.pdf`);
        const blobStream = fileBlob.createWriteStream();

        return new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
                console.error(error);
                reject('Upload failed');
            });

            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileBlob.name}`;
                resolve(publicUrl);
            });

            blobStream.end(file.buffer);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

module.exports = {
    uploadFile,
};
