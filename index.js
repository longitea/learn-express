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
    res.send('<h1>Gọi API bằng Express</h1>');

    console.log(123);

})

// GET ALL DB API
app.get('/NotionWiki', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            sorts: [
                {
                    property: "Siderbar_Number",
                    direction: "ascending"
                }
            ],

        });

        res.send(response);
        // const { results } = response;
        // console.log(results);

    } catch (error) {
        console.log(error);
    }
});


// GET SIDERBAR
app.get('/siderbar', async (req, res) => {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        sorts: [
            {
                property: "Siderbar_Number",
                direction: "ascending"
            }
        ],

    });

    // return array of result
    const { results } = response;
    let secondArray = []

    let dbID = ''
    results.forEach(databaseID => {
        if (databaseID.parent.type == "database_id") {
            let pageTitle = databaseID.properties.Page.title[0].plain_text
            secondArray.push({
                id: databaseID.id,
                name: pageTitle,
                subName: []
            })
        }
    })

    results.forEach(pageID => {
        if (pageID.parent.type == "page_id") {
            let pageTitle = pageID.properties.Page.title[0].plain_text
            secondArray.forEach(arrayID => {
                if (arrayID.id == pageID.parent.page_id) {
                    arrayID.subName.push({
                        id: pageID.id,
                        name: pageTitle,
                        secondSubName: []
                    })
                }
            })
        }
    })

    results.forEach(element => {
        if (element.parent.type == "page_id") {
            let pageTitle = element.properties.Page.title[0].plain_text
            secondArray.forEach(arrayID => {
                if (arrayID.subName.length != 0) {
                    arrayID.subName.forEach(el => {
                        if (el.id == element.parent.page_id) {
                            el.secondSubName.push({
                                id: element.id,
                                name: pageTitle,
                                thirdSubName: []
                            })
                        }
                    })
                }
            })
        }
    })

    results.forEach(element => {
        if (element.parent.type == "page_id") {
            let pageTitle = element.properties.Page.title[0].plain_text
            secondArray.forEach(arrayID => {
                if (arrayID.subName.length != 0) {
                    arrayID.subName.forEach(el => {
                        if (el.secondSubName.length != 0) {
                            el.secondSubName.forEach(third => {
                                if (third.id == element.parent.page_id) {
                                    third.thirdSubName.push({
                                        id: element.id,
                                        name: pageTitle,
                                        fourSubName: []
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })


    res.send(secondArray)

});