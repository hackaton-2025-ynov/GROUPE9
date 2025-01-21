// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// (1) Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { nom_utilisateur, email, mot_de_passe } = req.body;
    
    // Vérification champs requis
    if (!nom_utilisateur || !email || !mot_de_passe) {
      return res.status(400).json({ error: 'Merci de remplir tous les champs' });
    }
    
    // Vérifier si l’utilisateur existe déjà
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

    // Créer l’utilisateur
    const newUser = await User.create({
      nom_utilisateur,
      email,
      mot_de_passe_hache: hashedPassword
    });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      userId: newUser.id
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// (2) Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Vérifier champs
    if (!email || !mot_de_passe) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Chercher l’utilisateur dans la BDD
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Comparer les mots de passe
    const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe_hache);
    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    return res.json({
      message: 'Connexion réussie',
      userId: user.id,
      nom_utilisateur: user.nom_utilisateur
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
