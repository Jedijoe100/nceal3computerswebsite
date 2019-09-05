//Galaxy Generation
var spiralLength = 1500;
var spiralWidth = 100;
var spiralStretch = 10;
var spikyness = 10;
var values = new Array();
var values2 = new Array();
var starsA = new Array();
var starsB = new Array();
//Movement
var screenX = 1000;
var screenY = 1000;
var systemWidth = 5000000;
var systemHeight = 5000000;
var systemRatio = systemWidth/screenY;
var zoom = screenY/systemHeight;
var minzoom = screenY/systemHeight;
var scrollwidth = systemWidth - screenX;
var scrollheight = systemHeight - screenY;
var zoomaspect = zoom;
//Generation
var seed = 108478;
var randomN = new Random(seed);
//UI
var coordShow = new coords(10,20);
//var map = new miniMap(0,0,100,100);
function startGame() {
    myGameArea.start();
    for(y = 0; y < spiralLength; y++){
        for(x = 0; x < spiralWidth; x++){
            var Probability = randomN.nextFloat()*5;
            var Probability1 = randomN.nextFloat()*5;
            if(Probability <= densityCurve(x-spiralWidth/2,spiralWidth,spikyness)*densityCurve(y,spiralLength*2,spiralLength/10)*1/(spiralLength*spiralWidth)){
                starsA[starsA.length] = new stars(((x+spiralWidth*(y-80*Math.PI)/300)*Math.sin((y-100*Math.PI)/100)+500)/zoom,(500 + (x+spiralWidth*(y-80*Math.PI)/300)*Math.cos((y-100*Math.PI)/100))/zoom, Math.pow(1.027,Math.pow(randomN.nextFloat()*densityCurve(x-spiralWidth/2,spiralWidth,spikyness)*densityCurve(y,spiralLength*2,spiralLength/10)*1/(spiralLength*spiralWidth)*500,1)),Math.floor(randomN.nextFloat()*4)+1,Math.round(randomN.nextFloat()*100000),nameGenerator(4,randomN.nextFloat()));
            }
            if(Probability1 <= densityCurve(x-spiralWidth/2,spiralWidth,spikyness)*densityCurve(y,spiralLength*2,spiralLength/10)*1/(spiralLength*spiralWidth)){
                starsB[starsB.length] = new stars((-(x+spiralWidth*(y-80*Math.PI)/300)*Math.sin((y-100*Math.PI)/100)+500)/zoom,(500 - (x+spiralWidth*(y-80*Math.PI)/300)*Math.cos((y-100*Math.PI)/100))/zoom, Math.pow(1.027,Math.pow(randomN.nextFloat()*densityCurve(x-spiralWidth/2,spiralWidth,spikyness)*densityCurve(y,spiralLength*2,spiralLength/10)*1/(spiralLength*spiralWidth)*500,1)),Math.floor(randomN.nextFloat()*4)+1,Math.round(randomN.nextFloat()*100000),nameGenerator(4,randomN.nextFloat()));
            }
        }
    }
    screenX = 0;
    screenY = 0;
    totalObjects = starsA.concat(starsB);
}
function densityCurve(x,z,j){
    return (-2*(Math.pow(x,2))/(z)) + z/2 + j*Math.cos((4*Math.PI*x)/z)
}
function spaceValues(x,y,density){
    this.x = x;
    this.y = y;
    this.density = density;
}
function loadSystem(code,age,mass){
    window.location.assign("/CodeRunner?"+code+"/"+age+"/"+mass+"?SolarSystemSimulatorV2");
}
function stars(x,y,mass,age,code,name){
    this.colour = [0,0,0,1];
    this.size = 1;
    switch(age){
        case 1:
            if(mass>0.1 && mass<=1){
                this.colour = [255,(255*(mass-0.1)/(1-0.1)),0,0.8];
            }else if(mass>1 && mass<=100){
                this.colour = [(255*(100-mass)/(100-1)),255,(255*(mass-1)/(100-1)),0.8];
            }else if(mass>100 && mass<=200){
                this.colour = [(255*(mass-200)/(200-100)),255,255,0.8];
            }
            this.size = 100;
            break;
        case 2:
            this.colour = [255,(200*(200-mass)/(200-0.1)),(200*(200-mass)/(200-0.1)),0.8];
            this.size = 20*Math.pow(mass*10,0.5);
            break;
        case 3:
            this.colour = [255,255,255,0.2];
            this.size = 50*Math.pow(mass*10,0.5)
            break;
        case 4:
            if(mass>0.1 && mass<=1.5){
                this.colour = [255,255,255,0.4];
            }else if(mass>1.5 && mass<=3){
                this.colour = [255,255,255,1];
            }else if(mass>100 && mass<=200){
                this.colour = [10,10,10,1];
            }
            this.size =1;
            break;
    }
    this.clicked = function() {
        let clicked = true;
        if ((y)*zoom - screenY + (this.size*2*zoom) -(this.size*2*zoom)/2< myGameArea.y || (y)*zoom - screenY -(this.size*2*zoom)/2> myGameArea.y || (x)*zoom - screenX + (this.size*2*zoom) -(this.size*2*zoom)/2< myGameArea.x || (x)*zoom - screenX -(this.size*2*zoom)/2> myGameArea.x) {
            clicked = false;
        }
        return clicked;
    }
    this.update = function(){
        if(x*zoom - screenX < -this.size * zoom || x*zoom - screenX > myGameArea.width + this.size * zoom || y*zoom - screenY < -this.size * zoom || y*zoom - screenY > myGameArea.height + this.size * zoom){
        }else{
            let temstor;
            if(this.size * zoom  > 1){
                temstor = this.size * zoom;
                /*if(this.clicked()){
                    loadSystem(code,age,mass);
                }*/
            }else{
                temstor = 1;
            }
            ctx = myGameArea.context;
            ctx.fillStyle = "rgba("+this.colour[0]+","+this.colour[1]+","+this.colour[2]+","+this.colour[3]+")";
            ctx.beginPath();
            ctx.arc(x * zoom  - screenX, y * zoom  - screenY, temstor, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            if(zoom>0.8){
                for(i=0;i<this.planets.length;i++){
                    this.planets[i].update();
                }
            }
        }
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
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
    for(i=0;i<starsA.length;i++){
        starsA[i].update();
    }
    for(i=0;i<starsB.length;i++){
        starsB[i].update();
    }
}