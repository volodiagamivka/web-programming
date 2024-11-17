const express = require('express');
const cors = require('cors');
const hotelsRoutes = require('./routes/hotels');
const cartRouter = require('./routes/cart');
const authRoutes = require('./routes/auth');
const { checkDatabaseConnection } = require('./db');
const app = express();
const path = require('path');
const PORT = 3000;


checkDatabaseConnection();


app.use(cors());
app.use(express.json()); 

// Маршрути
app.use('/api/auth', authRoutes);   
app.use('/api', hotelsRoutes);      
    
app.use('/api', cartRouter);          
app.use('/static/media', express.static(path.join(__dirname, 'static/media')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
