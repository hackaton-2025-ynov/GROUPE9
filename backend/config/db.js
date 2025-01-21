require('dotenv').config(); 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  port: process.env.DB_PORT || 1433,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
    },
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  },
  logging: false, // Désactivez les logs SQL si non nécessaires
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch((error) => console.error('Erreur de connexion à la base de données :', error));

module.exports = sequelize;
