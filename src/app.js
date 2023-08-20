const express = require('express');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
app.use(express.json());

app.use('/', indexRoutes);
app.use('/api', uploadRoutes);

module.exports = app;
