const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/studentlogin', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

//   app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'CC1216.wing',
    database:'LinkToFYP'
})

app.get("/getStudent", (req, res)=>{
    console.log(req.query.text);
    db.query("select student_ID, first_name, last_name, cGPA from students",(err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});

app.post("/StudentCreate",(req, res)=>{
    const student_ID = req.body.student_ID;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const cGPA = req.body.cGPA;
    // const photo = req.body.photo;
    db.query("insert into Students (student_ID, first_name, last_name, cGPA) value (?,?,?,?)",[ student_ID, first_name, last_name, cGPA],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('value inserted');
        }
    })

})

app.listen(3001,()=>{
    console.log('listen to port 3001');
    console.log('set up database '+db);

})