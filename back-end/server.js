const express = require('express');
const cors = require('cors');
const hotelsRoutes = require('./routes/hotels');
const cartRouter = require('./routes/cartRouter');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/api', hotelsRoutes);
app.use('/api', cartRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
