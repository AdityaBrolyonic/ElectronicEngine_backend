const express = require("express");
const path = require('path');

const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser" );

const app = express()
const cors = require("cors");
const mysql = require("mysql");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(cors(
  {
    origin : ["http://localhost:3000"],
    methods : ["GET", "POST"],
    credentials : true
  }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
  key : "userId",
  secret : "hadd hai yar",
  resave : false,
  cookie : { expires : 60 * 60 * 24, },
  saveUninitialized : false,
}));

const db = mysql.createConnection({
user : "root",
host : "localhost",
password: "root",
database: "EEngine",
});


//------------------------------------------------------------------------------------------------------------------------

app.post("/createProduct", (req, res) => 
{
const { name, id, image, desc, brand, price, qua, features, category, review} = req.body;

try
{ db.query("INSERT INTO product (P_Id, P_Name, P_Image, P_Description, P_Brand, P_Quantity, P_Price, P_Category, P_Features, P_Reviews) values (?,?,?,?,?,?,?,?,?,?)",
[id,name,image,desc,brand,qua,price,category,features,review], (err, result) => {
    
    if(err) { console.log(err); }

    else  { res.send("values Inserted"); }})
}
catch(err)
{ console.error(err);
  res.status(500).send('Internal server error');}})

//Register------------------------------------------------------------------------------------------------------------------------

app.post("/createUser", (req, res) => 
{
const { name, number, pincode, address, state, email, password} = req.body;

try
{ bcrypt.hash(password,saltRounds, (err, hash) => {
db.query("INSERT INTO user (U_Name, U_Number, U_Pincode, U_Address, U_State, U_Email, U_Pass) values (?,?,?,?,?,?,?)",
[name, number, pincode, address, state, email, hash], (err, result) => {
    
    if(err) { console.log(err); }

    else  { res.send("Values Inserted"); }})
})
}
catch(err)
{ console.error(err);
  res.status(500).send('Internal server error');}})

//Login------------------------------------------------------------------------------------------------------------------------

app.get("/userLogin", (req, res) => 
{
  if(req.session.user)
  {
    res.send({loggedIn:true, user:req.session.user});
  }
  else
  {
    res.send({loggedIn:false}); 
  }
})


app.post("/userLogin", (req, res) => 
  {
  const {email, password} = req.body;
  
  try
  {  
  db.query("Select * from user where U_Email = ?",
  [email], (err, result) => {
      
      if(err) { console.log(err); }
  
      if(result.length > 0) {
        bcrypt.compare(password, result[0].U_Pass, (error, response)=>{

          if(response)
          {
            req.session.user = result;
            console.log(req.session.user);
            res.send(req.session.user);
          }
          else {res.send({message : "wrong email/password combination!"});}
          })

      } else  { res.send({message : "User doesn't Exist!"});}})
    }
  catch(err)
  { console.error(err);
    res.status(500).send('Internal server error');}})
  

    app.post('/userLogout', (req, res) => {
      req.session.destroy();
      res.send('Logout successful');
    });


//Products------------------------------------------------------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'public')))

  app.post("/showProducts" , (req,res) =>
  {
    const category = req.body.name
    db.query("Select * from product where P_Category = ?",
    [category], (err, result) => {
      if(err)
      {
        console.log(err);
      }
      else{ res.send(result); }
    })
  })

  // app.post("/showProductImage" , (req,res) =>
  // {
  //   const category = req.body.name
  //   db.query("Select * from product where P_Category = ?",
  //   [category], (err, result) => {
  //     if(err)
  //     {
  //       console.log(err);
  //     }
  //     else{
  //       const imageName = result[0].P_Image;
  //       res.send(imageName); }
  //   })
  // })

  

app.listen(3001, () => {
    console.log("Konnichiwa");
})
