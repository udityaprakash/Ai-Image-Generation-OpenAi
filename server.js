const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);  
    
app.get("/",async (req,res)=>{
    const response = await openai.createImage({
        prompt: "horse making a phonecall with its childrens surrounded in winter season outside horse yard",
        n: 5,
        size: "512x512",
      });
      image_url = response.data.data;
      res.json({url:image_url});
});



app.listen(4000,(err)=>{
    console.log("server started");
})