const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// define mongoose schema 
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const contact = mongoose.model('contact', contactschema);

// express specific stuff 
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded());

//  pug specific stuff 
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views') );

// Endpoints 
app.get('/', (req,res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item is not saved to database")
    })

    // res.status(200).render('contact.pug');
});

// Start the server 
 app.listen(port, ()=>{
     console.log(`the application sucessfully started on port ${port}`);
 });