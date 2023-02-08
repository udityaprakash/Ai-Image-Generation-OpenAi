const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");

const configuration = new Configuration({
    apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);  

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
    
app.get("/",async (req,res)=>{
    res.render("body.ejs",{imgurl:null , errmsg:''});
});

app.post("/", async (req, res)=>{
    let { context } = req.body;
    if(context){
        if(context.length >= 15){

            const response = await openai.createImage({
                prompt: context,
                n: 1,
                size: "512x512",
              });
              image_url = response.data.data[0].url;
              res.render("body.ejs",{imgurl: image_url , errmsg:""});
        }else{
            res.render("body.ejs",{imgurl:null, errmsg:"Write Something more."});
        }
        
    }else{
        res.render("body.ejs",{imgurl:null, errmsg:"Please write something to search"});
    }


});



app.listen(4000,(err)=>{
    console.log("server started");
})