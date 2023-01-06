// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }
const dotenv=require('dotenv')
const req = require("express/lib/request");
const { Configuration, OpenAIApi } = require("openai");
const path=require('path')
// const {dirname}=require('path')
const OPENAI_API_KEY=process.env.OPENAI_API_KEY

const express= require('express');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');
const app=express()
dotenv.config({path:"./config.env"})
app.use(express())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')

const PORT= process.env.PORT || 5000

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
 
app.get("/getform",async (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'))

})


app.post("/content",async (req,res)=>{
try {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: req.body.text,
  temperature: 0.33,
  max_tokens: 656,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
});
  // res.render("index",{
  //   text: response.data.choices[0].text
  // })
  // res.send(response.data.choices[0].text)
  // console.log(response.data.choices[0])
  // console.log(res.json(response.data.choices[0].text))
  res.send({text :response.data.choices[0].text})
  // console.log(response.data.choices[0].text)
  // console.log(req.body.text)
} 
catch (error) {
  console.log(error)
}
})


app.listen(PORT,()=>{
    console.log("Server Started")
})