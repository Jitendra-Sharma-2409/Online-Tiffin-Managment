const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/menu', menuItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.use('/api/deliverypersons', addressRoutes );


// Error Middleware
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
