const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const request = require("request");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "ab0f4d558e470017970dea4536dbcbcf";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;

            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature at " + query + " is currently " + temp + " degrees Celsius.</h1>");

            res.write("<h2>The weather at " + query + " is currently <em>" + weatherDescription + "</em>.</h2>");

            res.write("<img src=" + imageURL + ">");

            res.send();
        })
    })
});



app.listen(port, () => {
    console.log("Server running currently on port " + port);
});