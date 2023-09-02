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

module.exports = router;
