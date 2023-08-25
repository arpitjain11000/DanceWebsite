const express= require("express");
const path= require("path");
// const fs= require("fs")
const app= express();
const mongoose = require('mongoose');
const bodyparser= require("body-parser");

//thapa mongodb atlas
const DB= 'mongodb+srv://arpit:arpitjain@cluster0.4buggu7.mongodb.net/?retryWrites=true&w=majority'

//till tis thapa mongodb atlas

main().catch(err => console.log(err));

async function main() {
 // await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

 await mongoose.connect(DB);
}

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});
const Contact = mongoose.model('Contact', contactSchema);
const port= process.env.PORT ||5000;

// EXPRESS SPECIFC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const con= "This is the text, we want to see ";
    const params= {};
    res.status(200).render('home.pug',params);
  })

  app.get('/contact', (req, res) => {
    // const con= "This is the text, we want to see ";
    const params= {};
    res.status(200).render('contact.pug',params);
  })  
  app.post('/contact', (req, res) => {
    // const con= "This is the text, we want to see ";
    // const params= {};
    var myData= new Contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
  })  

  app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})