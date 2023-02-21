const express = require('express');
const request = require('request-promise');



const app = express();

// const apiKljuc = 'e14404e404888cab0f379ea6ba1684bd';

const generisiScraperUrl = (apiKljuc) => `http://api.scraperapi.com?api_key=${apiKljuc}&autoparse=true`;

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Dobrodosao na Amazon API.');
});


// GET za dobiti detalje proizvoda

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const odgovor = await request(`${generisiScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(odgovor));

    } catch (error) {
        res.json(error);

    }

});



// GET za dobiti detalje Reviews 

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const odgovor = await request(`${generisiScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(odgovor));

    } catch (error) {
        res.json(error);

    }

});

// GET za dobiti detalje Ponude 

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const odgovor = await request(`${generisiScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(odgovor));

    } catch (error) {
        res.json(error);

    }

});

// GET rezultati pretrage

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const odgovor = await request(`${generisiScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(odgovor));

    } catch (error) {
        res.json(error);

    }

});




app.listen(PORT, () =>
    console.log(`Server je startovao na portu ${PORT}`));









