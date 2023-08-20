// src/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../oneresume-storage-firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://oneresume-storage.appspot.com', 
});

const storage = admin.storage();

module.exports = storage;
