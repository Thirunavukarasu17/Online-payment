const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();


app.use(cors())

app.use(express.json())
const mongoDBURL='mongodb+srv://orderbackend2:thiru123@cluster0.4xmeftw.mongodb.net/order-collection?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoDBURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Use order routes
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});