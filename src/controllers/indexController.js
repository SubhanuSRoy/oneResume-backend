const indexService = require('../services/indexService');

const getIndex = (req, res) => {
    const message = indexService.getMessage();
    res.send(message);
};

module.exports = {
    getIndex,
};
