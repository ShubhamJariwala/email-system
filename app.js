const express=require('express');
const bodyParser= require('body-parser');
const nodemailer= require('nodemailer');

const app= express();

const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cloud4codemail@gmail.com',
      pass: 'lwwtrurjubauytfu'
    }
});

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
    console.log("Server started at port 3000");
});

// app.get('/', function(req, res){
//     res.sendFile(__dirname, '/adduser.html');
//     console.log("Adduser page");
// });
app.get('/', function(req, res){
    res.sendFile(__dirname+"/adduser.html");
});

app.post('/emailsent', function(req, res){
  //  console.log("Emal sent");

    const email= req.body.email;
    const username=req.body.username;
    const password= req.body.password;
    
    console.log(email+username+password);

    const mailcontent={
        from: 'Admin',
        to: email,
        subject:"User and Password",
        text: "Username: "+username+"  Password: "+password
    };
    
    transporter.sendMail(mailcontent, function(err, information){
        if(err)
        console.log(err);
        else{
        console.log("Email sent:"+information.response);
        }
    });

    res.send("Email sent");
});
