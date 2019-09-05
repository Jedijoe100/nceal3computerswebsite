var url = window.location.href;
var data = url.split("?");
let dataprocessed;
if (data == "SolarSystemSimulatorV2"){
    dataprocessed = Math.round(randomN.nextFloat()*100000)+"/"+(Math.floor(randomN.nextFloat()*4)+1) +"/" + (Math.random()*200);
}else{
    dataProcessed =data[1].split("/");
}
var seed = parseInt(dataProcessed[0]);//import the seed
var starInfo = [];
var xhttp = new XMLHttpRequest();
var totalObjects;
//Movement
var screenX = 1000;
var screenY = 1000;
var systemWidth = 10000;
var systemHeight = 10000;
var systemRatio = systemWidth/screenY;
var zoom = screenY/systemHeight;
var minzoom = screenY/systemHeight;
var scrollwidth = systemWidth - screenX;
var scrollheight = systemHeight - screenY;
var zoomaspect = zoom;
//Generation
var randomN = new Random(seed);
//System
var planets = [];
let starColour = [0,0,0,1];
let starSize = 1;
switch(parseInt(dataProcessed[1])){
    case 1:
        if(parseInt(dataProcessed[2])>0.1 && parseInt(dataProcessed[2])<=1){
            starColour = [255,(255*(parseInt(dataProcessed[2])-0.1)/(1-0.1)),0,0.8];
        }else if(parseInt(dataProcessed[2])>1 && parseInt(dataProcessed[2])<=100){
            starColour = [(255*(100-parseInt(dataProcessed[2]))/(100-1)),255,(255*(parseInt(dataProcessed[2])-1)/(100-1)),0.8];
        }else if(parseInt(dataProcessed[2])>100 && parseInt(dataProcessed[2])<=200){
            starColour = [(255*(parseInt(dataProcessed[2])-200)/(200-100)),255,255,0.8];
        }
        starSize = 100;
        break;
    case 2:
        starColour = [255,(200*(200-parseInt(dataProcessed[2]))/(200-0.1)),(200*(200-parseInt(dataProcessed[2]))/(200-0.1)),0.8];
        starSize = 20*Math.pow(parseInt(dataProcessed[2])*10,0.5);
        break;
    case 3:
        starColour = [255,255,255,0.2];
        starSize = 50*Math.pow(parseInt(dataProcessed[2])*10,0.5)
        break;
    case 4:
        if(parseInt(dataProcessed[2])>0.1 && parseInt(dataProcessed[2])<=1.5){
            starColour = [255,255,255,0.4];
        }else if(parseInt(dataProcessed[2])>1.5 && parseInt(dataProcessed[2])<=3){
            starColour = [255,255,255,1];
        }else if(parseInt(dataProcessed[2])>100 && parseInt(dataProcessed[2])<=200){
            starColour = [10,10,10,1];
        }
        starSize =1;
        break;
}
var star = new Celestial_Ob_Fx((systemWidth/2), (systemHeight/2), parseInt(dataProcessed[2])*1.989*Math.pow(10,14)/149597900, starSize,"rgba("+starColour[0]+","+starColour[1]+","+starColour[2]+","+starColour[3]+")", "test", parseInt(dataProcessed[1]));//import star info;
var ShowName = true;
function startGame() {
    myGameArea.start();
    var nP = Math.round(randomN.nextFloat()*10);
    for(n=0;n<nP;n++){
        planets[n] = new Celestial_Ob(randomN.nextFloat()*systemHeight/2 + star.size, star, randomN.nextFloat()*10, randomN.nextFloat()*10,randomN.nextFloat()*2,randomN.nextFloat()*1000, nameGenerator(8,randomN.nextFloat()),randomN.nextFloat()*100000);
    }
    screenX = 0;
    screenY = 0;
    totalObjects = planets;
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        myGameArea.x = 0;
        myGameArea.y =0;
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function(){
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height);
    }
}
function updateGameArea() {
    myGameArea.clear();
    controls();
    star.update();
    for(i=0;i<planets.length;i++){
        planets[i].update();
    }
}