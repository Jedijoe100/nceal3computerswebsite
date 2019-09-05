const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const folders = ["./public/js/general/","./public/js/programs/","./public/css/","./public/img/","./public/audio/","./public/html"];
const mysql = require('mysql');
const bodyParser = require('body-parser');
const middlewares = [bodyParser.urlencoded];
var objects = [];
var articles;
let articleNum = 0;

let i;
const l = folders.length;

var con = mysql.createConnection({
    host: "localhost",
    user: "NodeServer",
    password: "01skie49823hdsuyai-",
    database: "MainDB"
});

var n = 0;
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM content", function (err, result, fields) {
        if (err) throw err;
        articles = result;
        console.log(articles);
        for(i=0,l1=articles.length;i<l1;i++){
            if(articles[i].ArticleType == "Article"){
                articleNum += 1;
            }
        }
        findFile();
        server();
    });
});

function findFile() {
    for (i = 0; i < l; i++) {
        objects[i] = [];
        fs.readdirSync(folders[i]).forEach(file => {
            objects[i].push(file);
        });
    }
}
function findInformation(fileName){
    let n=0
    for(i=0, l1 = articles.length;i<l1;i++){
        if(articles[i].ProjectName == fileName){
            n=i;
            return n;
            break;
        }
    }
    return n;
}
function store(data) {
    var sql = 'INSERT INTO Content ( ArticleTitle,ArticleDescription, ProjectName,ArticleType) VALUES ("' + data.title + '","' + data.description +'","' + data.name +'","'+ data.type +'");';
    if(parseInt( data.code ) == 1){
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }else {
        var n = data.code;
        var del = 'Delete FROM content WHERE PageID = "'+ n +'";';
        con.query(del, function (err, result) {
            if (err) throw err;
            console.log("1 record deleted");
        });
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record replaced");
        });
    }
    articleNum = 0;
    con.query("SELECT * FROM content", function (err, result, fields) {
        if (err) throw err;
        articles = result;
        console.log(articles);
        for(i=0,l1=articles.length;i<l1;i++){
            if(articles[i].ArticleType == "Article"){
                articleNum += 1;
            }
        }
        findFile();
    });

}
function server() {
    console.log(articles[1].ArticleTitle);
    express()
        .use(express.urlencoded({ extended: false}))
        .use(express.static(path.join(__dirname, 'public')))
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs')
        .get('/', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1));  var why = findInformation(url.slice(url.lastIndexOf("?")+1)) + 1; res.render('pages/editor', {scripts: objects, current: articles[n], articles: articles, title: "Editor", content: "This is an editor to edit the decriptions and titles on the main website", why: why, PN: url.slice(url.lastIndexOf("?")+1) })})
        .post('/post', function(req, res){store(req.body); console.log(req.body); res.redirect("/")})
        .listen(PORT, () => console.log(`Listening on ${PORT}`));
}