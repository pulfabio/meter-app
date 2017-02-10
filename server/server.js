'use strict';
// Load dependencies
const express = require('express');
const app = express();
const cors = require('cors');
var meters = require("./meters");
var details = require("./details");

app.use(cors());

// Public route
app.get('/api/meters/main', (req, res)=>{
  res.json(meters);
})

// Private route
app.get('/api/meters/details', (req,res)=>{
  res.json(details);
})

app.listen(3001);
console.log('Serving meters on localhost:3001');