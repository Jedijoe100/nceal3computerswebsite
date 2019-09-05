//For assessment
//Media
//DONE through the individual pages
//Images
//DONE Add image for each page -- need to do scripts done mainImagePage not doing articles, composition or website
//TODO finish off system generator v2 and add the image of it
//Forms
//TODO find a way of implementing a form
//Hosting
//TODO move this to a hosting service(heroku)
//Other things
//TODO styles
//TODO turn images into image gallery
//TODO add galaxy webpage
//TODO remove dynamic backgrounds from the front end to the back end
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
//const { createCanvas, loadImage } = require('canvas');
const folders = ["./public/js/general/","./public/js/programs/","./public/css/","./public/img/Main","./public/audio/","./public/html"];
const mysql = require('mysql');
const nebulaTest = require('./ServerScripts/serverNebulaBackground.js');
let objects = [];
let articles;
let articleNum = 0;
//console.log(nebulaTest.LoadBackground(200,200));
let i;
const l = folders.length;

let con = mysql.createConnection({
    host: "localhost",
    user: "NodeServer",
    password: "01skie49823hdsuyai-",
    database: "MainDB"
});

let n = 0;
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
    let n=0;
    for(i=0, l1 = articles.length;i<l1;i++){
        if(articles[i].ProjectName == fileName){
            n=i;
            return n;
            break;
        }
    }
    return n;
}
function server() {
    express()
        .use(express.static(path.join(__dirname, 'public')))
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs')
        .get('/', (req, res) => res.render('pages/index', {scripts: objects, title: articles[1].ArticleTitle, content: articles[1].ArticleDescription}))
        .get('/Script', function(req, res){ res.render('pages/mainScriptPage', {scripts: objects, articles: articles, content: articles[2].ArticleDescription, title: articles[2].ArticleTitle})})
        .get('/Article', function(req, res){ res.render('pages/mainArticlePage', {scripts: objects, articles: articles, content: articles[3].ArticleDescription, title: articles[3].ArticleTitle})})
        .get('/Image', function(req, res){ res.render('pages/mainImagePage', {scripts: objects, articles: articles, content: articles[4].ArticleDescription, title: articles[4].ArticleTitle})})
        .get('/Composition', function(req, res){ res.render('pages/mainCompositionPage', {scripts: objects, articles: articles, content: articles[5].ArticleDescription, title: articles[5].ArticleTitle})})
        .get('/Website', function(req, res){ res.render('pages/mainWebsitePage', {scripts: objects, articles: articles, content: articles[6].ArticleDescription, title: articles[6].ArticleTitle})})
        .get('/Scripts', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1)); res.render('pages/scriptRunning', {scripts: objects, articles: articles, articleNum: articleNum, content: articles[n].ArticleDescription, title: articles[n].ArticleTitle, url1: url})})
        .get('/Articles', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1)); res.render('pages/articleTemplate', {scripts: objects, articles: articles, articleNum: articleNum, content: articles[n].ArticleDescription, title: articles[n].ArticleTitle, url1: url})})
        .get('/Images', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1)); res.render('pages/imageTemplate', {scripts: objects, articles: articles, articleNum: articleNum, content: articles[n].ArticleDescription, title: articles[n].ArticleTitle, url1: url})})
        .get('/Compositions', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1)); res.render('pages/compositionTemplate', {scripts: objects, articles: articles, articleNum: articleNum, content: articles[n].ArticleDescription, title: articles[n].ArticleTitle, url1: url})})
        .get('/Websites', function(req, res){ var url = req.url; var n = findInformation(url.slice(url.lastIndexOf("?")+1)); res.render('pages/htmlTemplate', {scripts: objects, articles: articles, articleNum: articleNum, content: articles[n].ArticleDescription, title: articles[n].ArticleTitle, url1: url})})
        .get('/codeRunner', function(req, res){ var url = req.url; res.render('pages/codeRunner', {title: '',scripts: objects, url1: url})})
        .listen(PORT, () => console.log(`Listening on ${PORT}`));
}