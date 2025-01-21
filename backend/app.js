const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const profileRoutes = require('./routes/profileRoutes');
const accueilRoutes = require('./routes/accueilRoutes');
const consumptionRoutes = require('./routes/consumptionRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('frontend/public'));

// Routes API
app.use('/accueil', accueilRoutes);
app.use('/users', userRoutes);
app.use('/consumptions', consumptionRoutes);
app.use('/friends', friendRoutes);
app.use('/profile', profileRoutes);

// Synchronisation de la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données Azure SQL.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données Azure SQL :', error);
  });

// Middleware de logs
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Servir les fichiers React pour le frontend
app.use(express.static(path.join(__dirname, '../frontend-react/build')));

// Route fallback pour React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-react/build', 'index.html'));
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
