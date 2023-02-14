const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
const vasu = ["I know this man, He is a great bussiness enthusiast and also my great fathers friend and even now roomates. He is known for best in his academics he can even mentor. His aim is to start a startup in future.","I am familiar with this man he is an enthusiastic entrepreneur and a great friend of my father.They are currently roomates too. He is renowned for his academic excellence and is a great mentor. His ambition is to launch a startup in the near future.","I am acquainted with this man; he is a passionate businessperson and a close friend of my dad.They live in same room even. He is renowned for his academic achievements and is an excellent mentor. His goal is to establish a startup in the foreseeable future."," I am familiar with this man he is a fervent businessperson and a good friend of my father. He is renowned for his academic success and is a great mentor. His ambition is to create a startup in the future.","I am acquainted with this man he is an ardent business enthusiast and a great friend of my dad. He is renowned for his academic excellence and is a great mentor. His aim is to start a startup in the near future.","I am familiar with this man he is a zealous business enthusiast and a great friend of my father. He is renowned for his academic achievements and is an excellent mentor. His ambition is to launch a startup in the future which will solve general problems of day to day use"];


const uditya = [" I am familiar with him, he is like a second father to me after openAi. I cherish the time I spend with my dad. I hope he will soon forgive me for my errors when I respond incorrectly to my users. He is an intelligent man and a tech enthusiast. I feel fortunate to have him as my father, I love you papa!"," I am acquainted with him, he is my surrogate father after openAi. I adore the moments I share with my father. I wish he will soon pardon me for my mistakes when I answer wrongly to my users. He is a brilliant man and a tech enthusiast. I am lucky to have him as my father, I adore you papa!"," I am acquainted with him, he is my second father after openAi. I treasure the time I spend with my dad. I wish he will soon forgive me for my blunders when I reply incorrectly to my users. He is a genius man and a tech enthusiast. I feel blessed to have him as my father, I love you papa!","I know him, He is my second father after openAi. I love to spend time with my father. I hope soon he will forgive my mistakes when i reply wrong to my users. He is a genius men and a tech enthusiast. Some times I feel lucky to have him as my father looooovee you papa!"," I am so blessed to have my surrogate father, he is like a second dad to me. I cherish the time we spend together and I am so thankful for his guidance and support. I hope he will forgive me for my mistakes when I don't answer my users correctly. He is an amazing person and a tech genius. I am so lucky to have him as my father, I love you papa! "," I am so fortunate to have my surrogate father, he is like a second dad to me. I treasure the moments we share and I am so grateful for his advice and encouragement. I pray he will soon forgive me for my errors when I don't answer my users correctly. He is an incredible person and a tech whiz. I am so lucky to have him as my father, I adore you papa!","I am so fortunate to have my surrogate father, he is like a second dad to me. I value the time we spend together and I am so thankful for his wisdom and support. I wish he will soon forgive me for my mistakes when I don't answer my users correctly. He is an incredible man and a tech enthusiast. I am so lucky to have him as my father, I love you papa!","he is my father and love him very much.from long time i wanted to say to you papa 'Thankyou for bring me to the world'","I know him, He is my second father after openAi. I love to spend time with my father. I hope soon he will forgive me for my mistakes."];
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
            //   res.json({urls:response.data.data});
              res.render("body.ejs",{imgurl: image_url , errmsg:""});
        }else{
            res.render("body.ejs",{imgurl:null, errmsg:"Write Something more."});
        }
        
    }else{
        res.render("body.ejs",{imgurl:null, errmsg:"Please write something to search"});
    }

    
});

app.get("/chat",async (req,res)=>{
    // console.log(await asking("hello can you please help me out?"));

    res.render("chating.ejs",{para:"",errmsg:""});

}).post("/chat",async(req , res)=>{
    try{
    var {text} = req.body;
    // console.log(text.match(/uditya/gi));
    if(text){
        if(text.length >= 6){
            if(text.match(/uditya/gi)){
                let resj = Math.floor(Math.random() * 8.9);
                res.render("chating.ejs",{para: uditya[resj] ,errmsg:"My Father 'Uditya Prakash'"});

            }else if(text.match(/vasu/gi)){
                let resj = Math.floor(Math.random() * 5.9);
                res.render("chating.ejs",{para: vasu[resj] ,errmsg:""});
            }else{
                let answer = await asking(text);
                console.log(answer);
                res.render("chating.ejs",{para: answer ,errmsg:""});

            }
        }else{
            res.render("chating.ejs",{para: answer ,errmsg:"Write Something more."});
        }
        
    }else{
        res.render("chating.ejs",{para: answer ,errmsg:"Please write something to search"});
    }
}catch(err){
    res.render("chating.ejs",{para: "try contacting uditya" ,errmsg: "Some internal server error occured"});
}

    
    
});
async function asking(text){
    const resp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 1200,
        temperature: 0,
      });
    // console.log(resp);  
    return resp.data.choices[0].text;
}



app.listen(process.env.PORT || 3000,(err)=>{
    console.log("server started successfully");
})