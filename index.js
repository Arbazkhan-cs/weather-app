// Module Require For Our Project
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const requests = require('requests');

// Creating The App
const app = express();

// Port No For Litening
const port = 8000;

// For taking city name input
app.use(express.urlencoded());

// Setting the style file
const style = path.join(__dirname, "../static");
app.use("/static",express.static(style));

// Setting The Engine
const partial = path.join(__dirname,"../templates");
app.set('veiw engine', 'hbs');
hbs.registerPartials(partial);



// Get Request
app.get("/", (req, res)=>{
    try{
        // Fetching API
        requests("https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c2b62693fd6555c89a9cd69c57d88723")
        
        // Fetching Data from the API
        .on("data", (data)=>{
            let obj = JSON.parse(data);

            // Rendering HBS file
            res.status(200).render('index.hbs', {
                Temp: ((obj.main.temp)-273.5).toFixed(2),
                min: ((obj.main.temp_min)-273.5).toFixed(2),
                max: ((obj.main.temp_max)-273.5).toFixed(2),
                state: obj.name,
                country: obj.sys.country
            }) 

            // If there is any error while fetching the data
        }).on("end", (err)=>{
            if(err){
                return res.render("index.hbs", {
                    error: "There is some error while fetching the data!!!",
                    error2: "Plss check your internet connection",
                    Temp: "None",
                    min: "None",
                    max: "None",
                    state: "None",
                    country: "None"
                });
            }
        })
    }

    catch(err){
        console.log("Something Went Wrong");
    }
    
})

// Post request
app.post("/", (req, res)=>{
    try{
        // Fetching data from the input
        let cityInsert = req.body;
    
        // Fetching wheather api
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${cityInsert.city}&appid=c2b62693fd6555c89a9cd69c57d88723`)
    
        // Fetching Data from the api
        .on("data", (data)=>{
            let obj = JSON.parse(data);
            console.log(cityInsert);
    
            // If the user input the wrong anser than show him
            if(obj.main == undefined){
                res.status(200).render("index.hbs", {
                    error: "Invalid City Or Country",
                    Temp: "None",
                    min: "None",
                    max: "None",
                    state: "None",
                    country: "None"
                });
                return;
            }
    
            // Rendering our hbs file
            res.render('index.hbs', {
                Temp: ((obj.main.temp)-273.5).toFixed(2),
                min: ((obj.main.temp_min)-273.5).toFixed(2),
                max: ((obj.main.temp_max)-273.5).toFixed(2),
                state: obj.name,
                country: obj.sys.country
            })
    
            // If some error while fetching the data
        }).on('end', (err)=>{
            if(err)
                return res.render("index.hbs", {
                    error: "There is some error while fetching the data!!!",
                    error2: "Plss check your internet connection",
                    Temp: "None",
                    min: "None",
                    max: "None",
                    state: "None",
                    country: "None"
                });
        })
    }

    catch(err){
        console.log("Some thing went wrong!!!");
    }

})


// Listening to the server
app.listen(port, ()=>{
    console.log(`listening to the Server = http://localhost:${port}`);
})