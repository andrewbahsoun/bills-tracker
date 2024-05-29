const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "19477469",
    database: "testing"
})

//connects the clinet using the const client information
client.connect();

// querys using SQL commands 
client.query('Select * from roommates', (err, res)=>{
    // error handling
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    client.end;

})