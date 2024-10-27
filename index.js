import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app=express();
const port=4000;
const API_KEY="feb51b8e58984cc0b04c2a3511bb7dec";
const API_URL="https://api.weatherbit.io/v2.0/current"
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get ("/", (req,res)=>{ 
    res.render ("index.ejs");
})
app.post("/weather",async(req,res)=>{
    try{
    const city=req.body.city;
    console.log(city)
    const response=await axios.get(`https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${city}`);
    const result=response.data;
    console.log(result);
    const temp=result.data[0].temp;
     const weather=result.data[0].weather.description;
     console.log(temp);
    console.log(weather);
    if(city.length===1||city.length===2||result.length===0){
        res.render("index.ejs",{
            city:"city not found Try again",
            temp:"null",
            weather:"null "
        })
    }
    else{
    res.render("index.ejs",{
        temp:temp,
        weather:weather,
        city:city,
    });
}
    
}catch(error){
  
  res.render ("index.ejs",{
    error:"city not found",
  })
}


});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})