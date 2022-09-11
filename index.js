const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = '52cabeee3837686bb0fb863c1b36a39c';

const generateScraperUrl = (apiKey) => `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

//GET product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        res.send(JSON.parse(response));
    } catch (error) {
        res.send(error);
    }
})

//GET product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.send(JSON.stringify(response));
    } catch (error) {
        res.send(error);
    }
})


//GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.send(JSON.stringify(response));
    } catch (error) {
        res.send(error);
    }
})

//GET search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.send(JSON.stringify(response));
    } catch (error) {
        res.send(error);
    }
})

app.listen(PORT, () =>{
    console.log(`Server is Running on PORT ${PORT}`);
})

