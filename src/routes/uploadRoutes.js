// src/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/uploadResume', upload.single('fileData'), async (req, res) => {
    try {
        const file = req.file;
        const user_id = req.body.user_id;

        if (!file || !user_id) {
            return res.status(400).send('Missing file or user_id');
        }

        const publicUrl = await uploadController.uploadFile(file, user_id);
        const updatedURL = await publicUrl?.replace(/\&token=.*/, "");

        return res.status(200).send(updatedURL);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

// post route to get the email id in the form of user_id and then retunr the link of the file which is named {user_id}.pdf
router.post('/getResume', async (req, res) => {
    try {
        const user_id = req.body.user_id;

        if (!user_id) {
            return res.status(400).send('Missing user_id');
        }

        const publicUrl = await uploadController.getResume(user_id);
        const updatedURL = publicUrl?.replace(/\&token=.*/, "");

        console.log(updatedURL);

        return res.status(200).send(updatedURL);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

router.get('/:alias_name', async (req, res) => {
    try {
        const alias_name = req.params.alias_name;

        if (!alias_name) {
            console.log('Missing alias_name')
            return res.status(400).send('Missing alias_name');
        }

        // Resolve the alias to the original URL (you need to implement this logic)
        const originalURL = `https://firebasestorage.googleapis.com/v0/b/oneresume-storage.appspot.com/o/${alias_name}.pdf?alt=media`;

        if (originalURL) {
            console.log('Redirecting to original URL');
            return res.redirect(originalURL);
        } else {
            console.log('Alias not found');
            return res.status(404).send('Alias not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
