const express = require('express');
const fs= require("fs");
const {join} = require('path')
const app = express();
const PORT = 3000;
const LOG_PATH = join(process.cwd(), "logs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/webhook', (req, res,) => {
    try {
        const body = req.body
        const filePath = join(LOG_PATH, `${Date.now()}-webhook.json`)

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

app.listen(PORT, () => {
    console.log("#######################################################")
    console.log(`Webhook tester listen in :${PORT}`);
    console.log(`Logs in :${LOG_PATH}`);
    console.log("#######################################################")
});