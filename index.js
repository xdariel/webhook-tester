require('dotenv').config()
const express = require('express');
const fs= require("fs");
const {join} = require('path')


const PORT = process.env.PORT ?? 3000;
const LOGS_PATH = process.env.LOGS_PATH ?? "./logs"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/webhook', (req, res,) => {
    try {
        const body = req.body
        const filePath = join(LOGS_PATH, `${Date.now()}-webhook.json`)

        const toSave = {
            body,
            date: new Date()
        }

        fs.writeFile(filePath, JSON.stringify(toSave), 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully");
            }
        });

        res.send("Ok");
    } catch (err) {
        res.status(500).send(String(err))
    }
});

app.get('/webhook', (req, res,) => {
    res.send("Hello from WebHook tester App")
})

app.listen(PORT, () => {
    console.log("#######################################################")
    console.log(`Webhook tester listen in local port: ${PORT}`);
    console.log(`Logs is saved in path: ${LOGS_PATH}`);
    console.log("#######################################################")
});