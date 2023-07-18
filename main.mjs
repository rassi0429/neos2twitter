import { TwitterApi } from 'twitter-api-v2';
import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
app.use(express.json());

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCRESS_SECRET
});

const twitterClient = client.readWrite


app.post("/twitter/post", async (req, res) => {
    console.log(req.body.content, req.body.image)
    const imageUrl = req.body.image.replace("URL:", "")

    const image = await fetch(imageUrl)
    const buffer = await image.buffer()
    const fileName = (new Date()).getTime()
    fs.writeFileSync(`./images/${fileName}.jpg`, buffer)

    const v1MediaId = await Promise.all([
        twitterClient.v1.uploadMedia(`./images/${fileName}.jpg`),
    ]);

    twitterClient.v2.tweet(req.body.content, { 'media': { media_ids: v1MediaId } }).then(res => {
        console.log(res)
    })
    res.send("OK")
})

app.listen(3333, () => {
    console.log("Server is running on port 3000")
})