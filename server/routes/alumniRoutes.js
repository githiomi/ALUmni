const express = require('express');

// Corresponding controller
const alumniController = require('./../controllers/alumniController');

// Router Class
const alumniRouter = express.Router();

alumniRouter.get('/alumni', alumniController.get_all_alumni);

alumniRouter.post('/newAlum', alumniController.new_alum);

alumniRouter.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(public, 'error.html'));
});

// Export
module.exports = alumniRouter;