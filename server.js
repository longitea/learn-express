let express = require('express');
const { Client } = require("@notionhq/client")
var cors = require('cors');
const { log } = require('console');
require('dotenv').config()

const app = express();
app.use(cors())


app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);


// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})



app.get('/', async (req, res) => {
    res.send('<h1>Gọi API bằng Express</h1>')

})


// notion sdk
app.get('/NotionAPIGet', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,

        });

        const vie = `Vie - Eng`

        res.send(response);
        const { results } = response;
        console.log(results);

    } catch (error) {
        console.log(error);
    }
});
