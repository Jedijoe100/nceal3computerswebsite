/*
* Plates
* ------
* Ideas
* Quadralaterals connected to each other with corners
* Use a noise function to draw the plates shapes
*
*
*
*
*
* */
var values = [];
var seaLevel =150;
var maxhieghtdiff = 1000;
var solarRadiation = 35;//27 for 1000 by 1000, 35 for 2000 by 2000
var imgData;
var pixWid = 1;
var pixHei = 1;
function startGame() {
    noise.seed(Math.random());
    myGameArea.start();
    for(x = 0; x < myGameArea.canvas.width; x++){
        for(y = 0; y<myGameArea.canvas.height; y++){
            var test;
            values[(x * myGameArea.canvas.width) + y] = new tile(x, y, Math.abs(noise.perlin2(x / 500, y / 500) + 0.5 * noise.perlin2(x / 250, y / 250) + 0.25 * noise.perlin2(x / 125, y / 125)) * maxhieghtdiff);
        }
    }
    values[0].humidity = 10;
    values[0].update();
    for(i = 1; i < values.length; i++){
        values[i].calculatehumidity();
        values[i].update();
        //console.log(values[i].humidity + " " + values[i].tempurature)
    }
}
function tile(x, y, altitude){
    this.x=x;
    this.y=y;
    this.altitude =  altitude - seaLevel;
    this.tempurature =  solarRadiation - 0.038*Math.abs(this.y - myGameArea.canvas.height/2) - (0.02*((this.altitude) - seaLevel));
    this.humidity = 10;
    this.calculatehumidity = function(){
        this.humidity = 2*(4 - Math.abs(this.y - myGameArea.canvas.height/2)/(myGameArea.canvas.height/6) + 1.5*Math.cos(Math.abs(this.y-myGameArea.canvas.height/2)*Math.PI/(myGameArea.canvas.height/6))) - values[((x * myGameArea.canvas.width) + y)-1].humidity/10 +this.tempurature/5 -this.altitude/100;
    };
    this.update = function() {
        ctx = myGameArea.context;
        if (Math.round(this.altitude) % 50 === 0){
            ctx.fillStyle = "black";
        }else if(this.altitude < 0 && this.tempurature < 0){ //deep ocean
            ctx.fillStyle = "white"
        } else if(this.altitude < -(maxhieghtdiff/20)){ //deep ocean
            ctx.fillStyle = "#0000AA"
        } else if (this.altitude < 0 && this.altitude >= -(maxhieghtdiff/20)) { //ocean
            ctx.fillStyle = "#0000FF"
        } else if (this.tempurature < 0){ //Tundra
            ctx.fillStyle = "#d5d5f6"
        } else if (this.tempurature < 20 && this.tempurature >= 0 && this.humidity * 5 < 10){ //cold desert
            ctx.fillStyle = "#cc9900"
        } else if (this.tempurature > 20 && this.humidity * 5 < 30){ //hot desert
            ctx.fillStyle = "#ff6600"
        } else if (this.tempurature >= 0 && this.humidity * 5 >= 10 && this.tempurature < 10){ //Boreal forest
            ctx.fillStyle = "#009900"
        } else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 10 && this.humidity * 5 < 30){ //Woodland
            ctx.fillStyle = "#cc6600"
        } else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 30 && this.humidity * 5 < 60){ //Seasonal forest
            ctx.fillStyle = "#66ff66"
        } else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 60){ //Temperate forest
            ctx.fillStyle = "#00cc66"
        } else if (this.tempurature >= 20 && this.humidity * 5 >= 30 && this.humidity * 5 < 60){ //Tropical forest
            ctx.fillStyle = "#cccc00"
        } else if (this.tempurature >= 20 && this.humidity * 5 >= 60){ //Tropical Rain forest
            ctx.fillStyle = "#006600"
        } else {
            ctx.fillStyle = "yellow"
        }
        ctx.fillRect(this.x , this.y , pixWid, pixHei);
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 2700;
        this.canvas.height = 2700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
};