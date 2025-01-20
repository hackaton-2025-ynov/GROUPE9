const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const consumptionRoutes = require('./routes/consumptionRoutes');
const friendRoutes = require('./routes/friendRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('frontend/public'));

app.use('/users', userRoutes);
app.use('/consumptions', consumptionRoutes);
app.use('/friends', friendRoutes);

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => console.error('Database connection error:', err));
