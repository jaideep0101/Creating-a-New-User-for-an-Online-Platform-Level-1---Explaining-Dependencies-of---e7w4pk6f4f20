const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const userDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/data/userDetails.json`)
);

//Middlewares
app.use(express.json());

// Write POST endpoint for registering new user

// GET endpoint for sending the details of users
app.get("/api/v1/details", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Detail of users fetched successfully",
    data: {
      userDetails,
    },
  });
});

// GET endpoint for sending the products to client by id
app.get("/api/v1/userdetails/:id", (req, res) => {
  let { id } = req.params;

  const details = userDetails.find((details) => details.id === id);
  if (!details) {
    return res.status(404).send({
      status: "failed",
      message: "Product not found!",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Details of users fetched successfully",
      data: {
        details,
      },
    });
  }
});


app.post("/api/v1/details",(req,res)=>{
 const {name,mail,number} = req.body;
 
 if(!name || !mail || !number){
    res.status(400).json({
        status: "Bad Request",
        message: "Missing required fields: name, mail or number"
    });
 }
 const lastUser = userDetails.length + 1;
 

 const newProduct = {
  "id":lastUser,
    "name": name,
    "mail": mail,
    "number": number
 };
 userDetails.push(newProduct);

 return res.status(201).json({
  "status": "Created",
  "message": "User registered successfully",
  "data":{
    "newProduct": {
      "id":newProduct.id,
      "name":newProduct.name,
      "mail":newProduct.mail,
      "number":newProduct.number
    }
  }
 })

})

module.exports = app;
