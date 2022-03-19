const express = require('express');
const https = require('https');

const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html');
})

app.post('/', (req, res) => {

    location =req.body.location
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e1543267df47c828137b352492e45516&units=metric`
    https.get(url,(response)=>{

        response.on('data',(data)=>{
            var wheather_data = JSON.parse(data) 
            var temp = wheather_data.main.temp;
            var description = wheather_data.weather[0].description;
            var icon_path = wheather_data.weather[0].icon
            var icon =`http://openweathermap.org/img/wn/${icon_path}@2x.png`
            res.write('<h1>The weather is Currrently'+ description +'</h1>')
            res.write('<h1>The Temparature is in '+ location+" "+ temp + ' Degree Celcius</h1>')
            res.write(`<img src=${icon}>`)
            res.send();
        })
    })
})

app.listen(3000,() => {
    console.log('listening on port 3000')
});

