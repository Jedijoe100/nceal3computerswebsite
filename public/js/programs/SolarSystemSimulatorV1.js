var solar_system = new Array();
var astroidrng = new Array();
var star = new Array();
/*Shows orbital lines when false*/
var hideLines = true;
/*How many times faster the simulation is*/
var speedSim = 1;
var time = 0;
/*orbit patterns*/
var orbitPattern = false;
/*Astroid Variables*/
var AstroidSize = 0.3;
var averageAstroidSpeed = 0.0002
/*Star Variables*/
var starNum = 500;
var starSize = 1;
var starColors = ["white", "yellow", "blue"];
/*Show Names*/
var ShowName = true;
function startGame() {
    myGameArea.start();
    /*Celestial Objects*/
    solar_system[0] = new Celestial_Ob_Fx(0, 800, 800, 100, 100, "#ffffcc", "Weilder");
    solar_system[1] = new Celestial_Ob(750, solar_system[0], 10, 10, 0.001, "yellow", "Weilder");
    solar_system[2] = new Celestial_Ob(600, solar_system[0], 20, 20, 0.004, "orange", "Meloont");
    solar_system[3] = new Celestial_Ob(550, solar_system[0], 5, 5, 0.008, "red", "Infernoo");
    solar_system[4] = new Celestial_Ob(20, solar_system[3], 1000, 1, 0.008, "red", "Landeth");
    solar_system[5] = new Celestial_Ob(20, solar_system[3], 1, 1, 0.008, "grey", "Randeth");
    /*Star Background*/
    /*star[0] = new Celestial_Ob_Fx(0, 800, 800, 0, 0, "#ffffcc");
    /*for(i = 1; i < starNum; i++){
        solar_system[i] = new Celestial_Ob(Math.floor((Math.random() * myGameArea.canvas.width/2), star[0], Math.floor((Math.random()) * (this.starSize)), Math.floor((Math.random()) * (this.starSize)), 0.00001, starColors[Round(Math.floor((Math.random()) * (starColors.length)), 0)]);
    }*/

}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "black";
        this.context.beginPath();
        this.context.rect(0,0,this.canvas.width, this.canvas.height);
        this.context.fill();
        this.context.closePath();
    }
}
function Celestial_Ob_Fx(distance, x, y, mass, size, colour, name){
    this.distance = distance;
    this.mass = mass;
    this.size = size;
    this.colour = colour;
    this.x = x;
    this.y = y;
    this.name = name;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        if(ShowName == true){
            ctx.font = "20px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.fillText(this.name,this.x + this.size, this.y + (this.size * 2)/3);
        }
    }
}
function Astroid_Rg(distance, master, mass, width, colour){
    this.distance = distance;
    this.mass = mass;
    this.colour = colour;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.astroids = new Array();
    for(i = 0; i < this.mass; i++){
        this.astroids[i] = new Astroid(Math.floor((Math.random() * (this.width)) + (this.distance)), Math.floor((Math.random() * (3 * AstroidSize)) + (2 * AstroidSize)), (Math.random() * (2*Math.PI)), master, (Math.random() * (averageAstroidSpeed)));
    }
    this.update = function(){
        ctx = myGameArea.context;
        for(i = 0; i < this.mass; i++){
            this.astroids[i].update(master);
        }
    }
}
function Astroid(distance, size, orbit, master, speed){
    this.distance = distance;
    this.master = master;
    this.speed = speed;
    this.size = size;
    this.colour = "grey";
    this.x = 0;
    this.y = 0;
    this.rotations = orbit;
    this.update = function(master1){
        ctx = myGameArea.context;
        var distx;
        var disty;
        this.rotations += this.speed * speedSim;
        distx = Math.sin(this.rotations)*this.distance;
        disty = Math.cos(this.rotations)*this.distance;
        this.x = master1.x + distx;
        this.y = master1.y + disty;
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
function Celestial_Ob(distance, master, mass, size, speed, colour, name){
    this.distance = distance;
    this.master = master;
    this.mass = mass;
    this.size = size;
    this.speed = speed;
    this.colour = colour;
    this.x = 0;
    this.y = 0;
    this.curcuml = 2 * distance * Math.PI;
    this.rt = this.curcum1 / speed;
    this.rpt = (2 * Math.PI)/this.rt;
    this.rotations = 0;
    this.name = name;
    if(this.mass >= 1000){
        this.rotations = Math.PI;
    }
    this.update = function(){
        ctx = myGameArea.context;
        var distx;
        var disty;
        this.rotations += this.speed * speedSim;
        distx = Math.sin(this.rotations)*this.distance;
        disty = Math.cos(this.rotations)*this.distance;
        this.x = master.x + distx;
        this.y = master.y + disty;
        if(hideLines == false){
            ctx.beginPath();
            ctx.arc(master.x, master.y, this.distance, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        if(ShowName == true){
            ctx.font = "20px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.fillText(this.name,this.x + this.size, this.y + (this.size * 2)/3);
        }
    }
}
function updateGameArea() {
    if(orbitPattern == false){
        myGameArea.clear();
    }
    time += 1*speedSim;
    /*for(i=0; i < Star.length; i++){
        Star[i].update();
    }*/
    for(i=0; i < astroidrng.length; i++){
        astroidrng[i].update();
    }
    for(i=0; i < solar_system.length; i++){
        solar_system[i].update();
    }
}
