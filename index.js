require('dotenv').config()
const express = require('express');
const fs= require("fs");
const {join} = require('path')


const PORT = process.env.PORT ?? 3000;
const LOGS_PATH = process.env.LOGS_PATH ?? "./logs"

const convertURI=(uri)=> {
    if (typeof uri === "string") {
        return JSON.parse(uri)
    } else {
        return uri
    }
}

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/webhook/:app', (req, res,) => {
    try {

        const app = req.params.app
        const body = req.body
        const filePath = join(LOGS_PATH, `${Date.now()}-webhook.json`)

        const toSave = {
            type: typeof body,
            app,
            body,
            date: new Date()
        }

        console.log("---------------------body-----------------------")
        console.log("TYPE: ", typeof body)
        console.log(convertURI(body))
        console.log("---------------------body-----------------------")

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