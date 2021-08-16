const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")


  // res.send("Server is running")
});

app.post("/", function(req , res){

const query = req.body.cityName;
const apiKey = "4510c012a6936d46f238d3d62f773d3f";
const units = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units="+ units ;
https.get(url, function(response) {
  console.log(response.statusCode);

  response.on("data", function(data) {
    const weatherData = JSON.parse(data);

    const temp = weatherData.main.temp;

    const weatherDescription = weatherData.weather[0].description;

    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";



    res.write("<h1>The temperature in " + query +  " is " + temp + " degree Celcius.</h1>")
    res.write("<p>The day is " + weatherDescription + " in " + query + ".")
    res.write("<img src=" + imageURL + ">")
    res.send()

  })

});
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
