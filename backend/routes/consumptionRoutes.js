const express = require('express');
const router = express.Router();

// Exemple de route pour la consommation
router.get('/', (req, res) => {
    res.send('Consumption routes are working!');
});

module.exports = router;
