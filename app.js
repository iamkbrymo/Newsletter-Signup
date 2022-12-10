//jshint esversion: 6

const express = require('express');
const bodyParser = require("body-parser");
//const request = require("request");
const https = require("https");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post("/",function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const apiKey = "9865723a1a45b2b923fbd34ef2755cfe-us21";
    const listID = "f57899d281";

    const url = "https://us21.api.mailchimp.com/3.0/lists/f57899d281";

    const options = {
        method: "POST",
        auth: "kolapo1:9865723a1a45b2b923fbd34ef2755cfe-us21",
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode===200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post('/failure', function(req,res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});