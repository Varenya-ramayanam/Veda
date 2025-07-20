const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoute');

dotenv.config();
connectDB();
    

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);


// API ROUTES 
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});