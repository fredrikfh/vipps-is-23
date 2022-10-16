const fetch = (...args) => import('node-fetch').then(({default: fetch}) => 
 fetch(...args));

const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() );

const cors = require("cors");
app.use(cors());

app.listen(
    PORT,
    () => console.log(`Server listening on port ${PORT}`)
);

app.get('/article/:name', async (req, res) => {
    const articleName = req.params.name;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${articleName}`;

    let response, data;
    try {
        response = await fetch(endpoint);
        data = await response.json();
    } catch (err) {
        console.log(err);
    }

    if (data === null) {
        res.status(404).send({
            article: articleName,
            status: 404
        });
    } else if (data.parse) {
        // wiki-page exists
        const rawData = data.parse.text['*']; // html output
        const rawDataLower = rawData.toLowerCase();
    
        let pos = 0;
        let occurrences = [];
    
        while (rawDataLower.indexOf(articleName.toLowerCase(), pos) !== -1) {
            occurrences.push(rawDataLower.indexOf(articleName.toLowerCase(), pos));
            pos = rawDataLower.indexOf(articleName.toLowerCase(), pos) + 1;
        }

        res.status(200);
        res.send({
            article: articleName,
            status: 200,
            data: rawData,
            occurrences: occurrences.length
        });
    } else {
        // wikipedia-article doesn't exist
        res.status(404).send({
            article: articleName,
            status: 404
        });
    }

})