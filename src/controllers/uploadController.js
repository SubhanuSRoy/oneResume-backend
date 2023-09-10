// src/controllers/uploadController.js
const storage = require("../firebase");
const { getStorage, getDownloadURL } = require('firebase-admin/storage');


const uploadFile = async (file, user_id) => {
  try {
    const bucket = storage.bucket();
    const fileBlob = bucket.file(`${user_id}.pdf`);
    const blobStream = fileBlob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on("error", (error) => {
        console.error(error);
        reject("Upload failed");
      });

      
      blobStream.on("finish", () => {
        
        const fileRef = getStorage().bucket(bucket.name).file(fileBlob.name);
        const downloadURL= getDownloadURL(fileRef);
     
         // Shorten the URL (replace this with your shortening logic)
         const shortURL = shortenURL(downloadURL, user_id);

         resolve(shortURL);
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

// function called getResume, which takes user id as input and returns the link of the file which is named {user_id}.pdf, if there is no file by that name then return an error
const getResume = async (user_id) => {
  try {
    console.log(user_id);
    const bucket = storage.bucket();
    const file = bucket.file(`${user_id}.pdf`);
    const exists = await file.exists();
    if (exists[0]) {
      const fileRef = getStorage().bucket(bucket.name).file(file.name);
      const downloadURL= getDownloadURL(fileRef);
      console.log(downloadURL);

      return downloadURL;
    } else {
      throw new Error("File does not exist");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};


// Function to shorten the URL (you can replace this with your own logic)
const shortenURL = (originalURL,user_id) => {
  return `https://oneresume-vd25.onrender.com/${user_id}`;
};

module.exports = {
  uploadFile,
  getResume
};
