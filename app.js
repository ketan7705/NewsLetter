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

        url : "https://us19.api.mailchimp.com/3.0/lists/--List-id--/members/--ApiKey--/notes/",
        method: "POST",
        headers :{
            "Authorization" : "--List-id-- [--ApiKey--]"
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

