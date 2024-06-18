const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

client.connect();

app.get('/testing', (req, res)=>{
    client.query(`Select * from roommates`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
