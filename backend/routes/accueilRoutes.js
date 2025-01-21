const express = require('express');
const router = express.Router();

// Endpoint pour "Mes consommations"
router.get('/consommations', async (req, res) => {
  try {
    const consommations = [
      { id: 1, type: 'Électricité', consommation: 250 },
      { id: 2, type: 'Eau', consommation: 120 },
      { id: 3, type: 'Gaz', consommation: 75 },
    ];
    res.json(consommations);
  } catch (error) {
    console.error('Erreur dans /accueil/consommations :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// Endpoint pour "Comparaison"
router.get('/comparaison', async (req, res) => {
  try {
    const comparaison = [
      { mois: 'Janvier', consommation: 300, moyenne: 280 },
      { mois: 'Février', consommation: 250, moyenne: 260 },
      { mois: 'Mars', consommation: 200, moyenne: 240 },
    ];
    res.json(comparaison);
  } catch (error) {
    console.error('Erreur dans /accueil/comparaison :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
