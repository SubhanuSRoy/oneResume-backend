// src/controllers/uploadController.js
const storage = require("../firebase");
const { getStorage, getDownloadURL } = require('firebase-admin/storage');


const uploadFile = async (file, user_id) => {
  try {
    const bucket = storage.bucket();
    const fileBlob = bucket.file(`resumes/${user_id}_resume.pdf`);
    const blobStream = fileBlob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on("error", (error) => {
        console.error(error);
        reject("Upload failed");
      });

      
      blobStream.on("finish", () => {
        
        const fileRef = getStorage().bucket(bucket.name).file(fileBlob.name);
        const downloadURL= getDownloadURL(fileRef);
        // fileBlob
        //   .getMetadata()
        //   .then((metadata) => {
        //     const downloadUrl = metadata[0].mediaLink;

        //     // The download URL can be used to access the file
        //     console.log(downloadUrl);
        //     resolve(downloadUrl);
        //   })
        //   .catch((error) => {
        //     // Handle any errors
        //     console.error(error);
        //   });
        // const publicUrl = `https://firebasestorage.googleapis.com/${bucket.name}/${fileBlob.name}?alt=media`;
        // resolve(publicUrl);
        resolve(downloadURL);
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  uploadFile,
};
