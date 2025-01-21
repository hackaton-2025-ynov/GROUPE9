const express = require('express');
const sequelize = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware'); // Si nécessaire

const router = express.Router();

// Récupérer les informations utilisateur
router.get('/', async (req, res) => {
  console.log('Requête reçue pour /profile avec session :', req.session);

  if (!req.session.userId) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    const [results] = await sequelize.query(
      `SELECT nom_utilisateur, email FROM utilisateurs WHERE id = :id`,
      { replacements: { id: req.session.userId } }
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Erreur dans /profile :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// Mettre à jour les informations utilisateur
router.put('/update', async (req, res) => {
  const { nom_utilisateur, email, mot_de_passe } = req.body;

  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }

  try {
    await sequelize.query(
      `UPDATE utilisateurs SET nom_utilisateur = :nom_utilisateur, email = :email, mot_de_passe = :mot_de_passe WHERE id = :id`,
      {
        replacements: {
          id: req.session.userId,
          nom_utilisateur,
          email,
          mot_de_passe,
        },
      }
    );
    res.status(200).json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur dans /update :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
