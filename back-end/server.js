const express = require('express');
const cors = require('cors');
const hotelsRoutes = require('./routes/hotels');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/api', hotelsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
