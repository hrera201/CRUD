const client=require('./Router/connection');
const express = require('express');
const app = express();

app.listen(3005, ()=>{
    console.log("Sever is now listening at port 8080");
})

client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, name, city, country) 
                       values(${user.id}, '${user.name}', '${user.city}', '${user.country}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       city = '${user.city}',
                       country = '${user.country}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful') 
        }
        else{ console.log(err.message) }
    })
    client.end;
})


