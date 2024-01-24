const express = require('express');
const contactRouter = express.Router();

const contactController = require('./../controllers/contactController');

contactRouter.post('/', contactController.postMessage);

module.exports = contactRouter;