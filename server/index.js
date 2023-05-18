const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
host:"onecpeappdev.csuln5njtxj4.us-east-1.rds.amazonaws.com",
user:"onecpe",
password:"onecpe123",
database: "agora"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{

    const sqlGet = "SELECT * from `users`";
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{

    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})


app.delete("/api/remove/:id",(req,res)=>{

    const {id} = req.params;
    const sqlRemove = "DELETE from users where id = ?";
    db.query(sqlRemove,id,(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * from `users` where id = ?";
    db.query(sqlGet,id,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "Update `users` SET email = ?,name =?, password =? where id = ?";
    db.query(sqlUpdate,[email,name,contact,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.get("/",(req,res)=>{
const sqlinsert = "INSERT INTO `users` (`name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES ('testadmin', 'admin1@broomboom.com', NULL, '$2y$10$mGFgtf7nS6BbFEY32QjV2OMYUJGIwwqTSdhLek4pePio5P9ioiE8e', NULL, '2023-03-13 23:37:42', '2023-03-13 23:37:42')";
db.query(sqlinsert,(err,result)=>{
    console.log(err);
    res.send("Hello Express");

})


})

app.listen(5000,()=>{
    console.log("server is running chutiya");
})


