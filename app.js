require('dotenv').config();
// npm run debug to start nodemon in debug mode.
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./route/product-router');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href ="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening at ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();