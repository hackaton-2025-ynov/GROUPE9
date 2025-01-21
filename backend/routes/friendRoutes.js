const express = require('express');
const router = express.Router();

// Exemple de route pour la consommation
router.get('/', (req, res) => {
    res.send('friendRoutes routes are working!');
});

module.exports = router;