const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const app = express()
const urlencodeParser = bodyParser.urlencoded({extended:false})
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
})
sql.query("use nodejs")
app.use('/img', express.static('img'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))


//Template engine 
app.engine("handlebars", handlebars({defaultlayout: 'main'}))
app.set('view engine', 'handlebars')
// app.use('/css',express.static('css'))
// app.use('/js',express.static('js'))
// app.use('/img',express.static('img'))

//Routs e templetes
app.get("/", (req, res) => {
    // res.send("Tela inicial")
    // res.render('index')
    res.render('index', {id: req.params.id})
})

app.get("/inserir", (req ,res) => {
    res.render("inserir")
})

app.get("/select:id?", (req ,res) => {
    if(!req.params.id){
        sql.query("select * from user order by id asc",function(err, results, fields){
        res.render('select', {data: results})
    });
    }else{
        sql.query("select * from user  where id=? order by id asc", [req.params.id],function(err, results, fields){
            res.render('select', {data: results})
    }
})


app.post("/controllerForm", urlencodeParser, (req, res) => {
    sql.query("insert into user values (?,?,?)", [req.body.id, req.body.name, req.body.age])
    res.render("controllerForm",{name: req.body.name})
})

// Start Sever

app.listen(3000, (req, res) => {
    console.log('Servidor está rodando')
})