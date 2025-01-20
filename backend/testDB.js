const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql', // Utilise mssql pour Azure SQL
    port: process.env.DB_PORT || 1433,
    dialectOptions: {
        options: {
            encrypt: true, // Active le chiffrement SSL requis par Azure
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: console.log,
});

(async () => {
    try {
        console.log("Tentative de connexion avec les informations suivantes :");
        console.log(`Hôte : ${process.env.DB_HOST}`);
        console.log(`Utilisateur : ${process.env.DB_USER}`);
        console.log(`Base : ${process.env.DB_NAME}`);
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    } finally {
        await sequelize.close();
    }
})();
