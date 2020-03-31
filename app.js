const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var fName=req.body.fName;
    var lName=req.body.lName;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status:"Subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
        }
    ]
    };

    var jsonData = JSON.stringify(data);

    console.log(fName,lName,email); 
    
    var options = {
// 5aafbfca83
        url : "https://us19.api.mailchimp.com/3.0/lists/5aafbfca83/members/6f4b546d2ba9440271a9f8777142bae0-us19/notes/",
        method: "POST",
        headers :{
            "Authorization" : "5aafbfca83 [6f4b546d2ba9440271a9f8777142bae0-us19]"
        },
        body :jsonData
    };

    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname + "/failure.html")
        }else{
            if(response.statusCode == 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                console.log(response.statusCode);
                res.sendFile(__dirname + "/failure.html")
            }
        }

    })
  
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("Your Server Starts At Port 3000 ");
});

// API KEy
// b7e3dd1582240b3bfd8be3f73f249ba4-us19

//list id
// 5aafbfca83