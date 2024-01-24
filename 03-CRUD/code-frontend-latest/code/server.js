const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

//endpoint starts here
//req -> request
//res -> response
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/update/:profileId', (req, res)=>{
    res.sendFile(__dirname + '/public/update.html');
})

app.get('/delete/:profileId', (req, res)=>{
    res.sendFile(__dirname + '/public/delete.html');
})

app.get('/home', (req, res)=>{
    res.sendFile(__dirname + '/public/home.html');
})

app.get('/about', (req, res)=>{
    res.sendFile(__dirname + '/public/about-us.html');
})

app.get('/contact', (req, res)=>{
    res.sendFile(__dirname + '/public/contact-us.html');
})

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/public/login.html');
})

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + '/public/register.html');
})

app.get('/logout', (req, res)=>{
    res.sendFile(__dirname + '/public/logout.html');
})





app.listen(port);
console.log('front end server is now running in port '+port);