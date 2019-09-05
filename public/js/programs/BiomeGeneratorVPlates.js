let plateCorners = new Array();
const seed1 = 0;//Math.floor(Math.random()*10000000);
console.log(seed1);
let randomN = new Random(seed1);
let plates = new Array();
let altitudes = new Array();
const altitudeFactor = 20;
const plateVariation = 100;
const deposite =20;
let plateNum;
var values = [];
var seaLevel =50;
var maxhieghtdiff = 1000;
var solarRadiation = 27;//27 for 1000 by 1000, 35 for 2000 by 2000
var imgData;
const volcanicEffect =200;
var pixWid = 1;
var pixHei = 1;
const changefactor = 0.3;
const collectionAmount = 20;
function startGame() {
    noise.seed(randomN.nextFloat());
    myGameArea.start();
    plateNum = Math.floor(((myGameArea.canvas.width + plateVariation * 6) * (myGameArea.canvas.height + plateVariation * 2)) / Math.pow(plateVariation * 2, 2));
    for (let i = 0; i < plateNum + 2 * myGameArea.canvas.width + 2 * myGameArea.canvas.height; i++) {
        plateCorners[i] = new Array();
        plateCorners[i] = [randomN.nextFloat() * plateVariation * 2 - plateVariation, randomN.nextFloat() * plateVariation * 2 - plateVariation, randomN.nextFloat() * altitudeFactor];
    }
    const numPlateH = Math.floor(myGameArea.canvas.width / (plateVariation * 2)) + 3;
    for (let i = 0; i < plateNum; i++) {
        const xLoc = (i % numPlateH) * plateVariation * 2 - plateVariation * 2;
        const yLoc = Math.floor(i / numPlateH) * plateVariation * 2 - plateVariation * 2;
        plates[i] = new plate(xLoc + plateCorners[i][0], yLoc + plateCorners[i][1], plateCorners[i][2], xLoc + plateVariation * 2 + plateCorners[i + 1][0], yLoc + plateCorners[i + 1][1], plateCorners[i + 1][2], xLoc + plateCorners[i + numPlateH][0], yLoc + plateVariation * 2 + plateCorners[i + numPlateH][1], plateCorners[i + numPlateH][2], xLoc + plateVariation * 2 + plateCorners[i + numPlateH + 1][0], yLoc + plateVariation * 2 + plateCorners[i + numPlateH + 1][1], plateCorners[i + numPlateH + 1][2])
    }
    for (let i = 0; i < plates.length; i++) {
        plates[i].update();
    }
    for(y=0;y<myGameArea.canvas.height;y++){
        for(x=0;x<myGameArea.canvas.width;x++){
            altitudes[Math.floor(y*myGameArea.canvas.width+x)] = 0;
        }
    }
    volcano();
    smooth();
    for (x = 0; x < myGameArea.canvas.width; x++) {
        for (y = 0; y < myGameArea.canvas.height; y++) {
            var test;
            values[(x * myGameArea.canvas.width) + y] = new tile(x, y, Math.abs(noise.perlin2(x / 500, y / 500) + 0.5 * noise.perlin2(x / 250, y / 250) + 0.25 * noise.perlin2(x / 125, y / 125)) * maxhieghtdiff);
        }
    }
    values[0].humidity = 10;
    for (i = 1; i < values.length; i++) {
        values[i].calculatehumidity();
    }
    //weathering();
    values[0].update();
    for (i = 1; i < values.length; i++) {
        values[i].update();
    }
}
function volcano(){
    for(i=0,l=volcanicEffect;i<volcanicEffect;i++){
        let x = Math.floor(randomN.nextFloat()*myGameArea.canvas.width);
        let y = Math.floor(randomN.nextFloat()*myGameArea.canvas.height);
        altitudes[Math.floor(y*myGameArea.canvas.width+x)] = altitudes[Math.floor(y*myGameArea.canvas.width+x)]*2;
        console.log(altitudes[Math.floor(y*myGameArea.canvas.width+x)]);
    }
}
function weathering(){
    for(i=0;i<values.length;i++){
        let time = 0;
        let material = 0;
        let currentAltitude = values[i].altitude;
        let rain = values[i].humidity/3;
        let location = i;
        let momentum = [0,0,0,0];
        while(currentAltitude>0 && time<100){
            time+=1;
            currentAltitude = values[location].altitude;
            let direction = 0;
            let altDirection = 0;
            let heightDiff = 0;
            try {
                    if (location + 1 < values.length && currentAltitude - values[location + 1].altitude + momentum[0] + values[location + 1].river > altDirection) {
                        altDirection = currentAltitude - values[location + 1].altitude + momentum[0];
                        heightDiff = currentAltitude - Math.abs(values[location + 1].altitude);
                        direction = 1;
                    }
                    if (location + myGameArea.canvas.width < values.length && currentAltitude - values[location + myGameArea.canvas.width].altitude + momentum[1] + values[location + myGameArea.canvas.width].river > altDirection) {
                        altDirection = currentAltitude - values[location + myGameArea.canvas.width].altitude + momentum[1];
                        heightDiff = currentAltitude - Math.abs(values[location + myGameArea.canvas.width].altitude);
                        direction = 2;
                    }
                    if (location - 1 < values.length && currentAltitude - values[location - 1].altitude +values[location - 1].river+ momentum[2] > altDirection) {
                        altDirection = currentAltitude - values[location - 1].altitude + momentum[2];
                        heightDiff = currentAltitude - Math.abs(values[location - 1].altitude);
                        direction = 3;
                    }
                    if (location - myGameArea.canvas.width < values.length && location - myGameArea.canvas.width > 0 && currentAltitude - values[location - myGameArea.canvas.width].altitude + values[location - myGameArea.canvas.width].river + momentum[3] > altDirection) {
                        altDirection = currentAltitude - values[location - myGameArea.canvas.width].altitude + momentum[3];
                        heightDiff = currentAltitude - Math.abs(values[location - myGameArea.canvas.width].altitude);
                        direction = 4;
                    }
                    if(time == 99){
                        direction = 0;
                    }
                    if(heightDiff > 1000 || material > 1000){
                        console.log(heightDiff+ "|" + material) ;
                    }
            }catch(err){
                console.log(err);
                console.log(location);
            }
            if(altDirection < 1 && material > 0){
                values[location].altitude += material*(1-altDirection)*rain/collectionAmount;
                material -= material*(1-altDirection)*rain/collectionAmount;
            }else{
                values[location].altitude -= heightDiff*(1-1/(altDirection*rain))/deposite;
                material += heightDiff*(1-1/(altDirection*rain))/deposite;
            }
            values[location].river += rain;
            switch (direction) {
                case 0:
                    currentAltitude =0;
                    values[location].river += rain;
                    break;
                case 1:
                    location += 1;
                    momentum[0] = altDirection/100;
                    break;
                case 2:
                    location += myGameArea.canvas.width;
                    momentum[1] = altDirection/100;
                    break;
                case 3:
                    location -= 1;
                    momentum[2] = altDirection/100;
                    break;
                case 4:
                    location -= myGameArea.canvas.width;
                    momentum[3] = altDirection/100;
                    break;
            }
            currentAltitude = values[location].altitude;
        }
    }
}
function smooth(){
    for(i=0;i< altitudes.length;i++){
        for(n=0,m=10;n<m;n++){
            for(b=0; b< m-n;b++){
                if(i+n*myGameArea.canvas.width+b<altitudes.length && b+n !== 0) {
                    altitudes[i] -= changefactor/(b+n) * (altitudes[i] - altitudes[i + b + n*myGameArea.canvas.width]);
                    altitudes[i+b+n*myGameArea.canvas.width] += changefactor/(b+n) * (altitudes[i] - altitudes[i + b + n*myGameArea.canvas.width]);
                }
            }
        }
    }
}
function plate(px1,py1,pa1,px2,py2,pa2,px3,py3,pa3,px4,py4,pa4) {
    this.plateCorners1 = [];
    this.plateCorners1[1] = [];
    this.plateCorners1[1] = [px1,py1,pa1];
    this.plateCorners1[2] = [];
    this.plateCorners1[2] = [px2,py2,pa2];
    this.plateCorners1[3] = [];
    this.plateCorners1[3] = [px3,py3,pa3];
    this.plateCorners1[4] = [];
    this.plateCorners1[4] = [px4,py4,pa4];
    this.update = function () {
        this.ctx = myGameArea.context;
        this.ctx.beginPath();
        this.ctx.moveTo(this.plateCorners1[1][0],this.plateCorners1[1][1]);
        this.ctx.lineTo(this.plateCorners1[2][0],this.plateCorners1[2][1]);
        this.ctx.lineTo(this.plateCorners1[4][0],this.plateCorners1[4][1]);
        this.ctx.lineTo(this.plateCorners1[3][0],this.plateCorners1[3][1]);
        this.ctx.lineTo(this.plateCorners1[1][0],this.plateCorners1[1][1]);
        this.ctx.stroke();
        let equationCalc = new Matrix([
            [this.plateCorners1[1][0],this.plateCorners1[1][1],Math.pow(this.plateCorners1[1][0],2),Math.pow(this.plateCorners1[1][1],2)],
            [this.plateCorners1[2][0],this.plateCorners1[2][1],Math.pow(this.plateCorners1[2][0],2),Math.pow(this.plateCorners1[2][1],2)],
            [this.plateCorners1[3][0],this.plateCorners1[3][1],Math.pow(this.plateCorners1[3][0],2),Math.pow(this.plateCorners1[3][1],2)],
            [this.plateCorners1[4][0],this.plateCorners1[4][1],Math.pow(this.plateCorners1[4][0],2),Math.pow(this.plateCorners1[4][1],2)]
        ]);

        let equationCalcIn = equationCalc.inverse();
        let zVal = new Matrix([
            [this.plateCorners1[1][2]],
            [this.plateCorners1[2][2]],
            [this.plateCorners1[3][2]],
            [this.plateCorners1[4][2]]
        ]);
        let values = equationCalcIn.multiply( zVal );
        values = values.toArray();
        let feasibleRegions = [];
        feasibleRegions[0] = new Matrix([
            [this.plateCorners1[1][0],1],
            [this.plateCorners1[2][0],1]
        ]);
        feasibleRegions[1] = new Matrix([
            [this.plateCorners1[2][0],1],
            [this.plateCorners1[4][0],1]
        ]);
        feasibleRegions[2] = new Matrix([
            [this.plateCorners1[4][0],1],
            [this.plateCorners1[3][0],1]
        ]);
        feasibleRegions[3] = new Matrix([
            [this.plateCorners1[3][0],1],
            [this.plateCorners1[1][0],1]
        ]);
        let feasibleRegionsA = [];
        feasibleRegionsA[0] = new Matrix([
            [this.plateCorners1[1][1]],
            [this.plateCorners1[2][1]]
        ]);
        feasibleRegionsA[1] = new Matrix([
            [this.plateCorners1[2][1]],
            [this.plateCorners1[4][1]]
        ]);
        feasibleRegionsA[2] = new Matrix([
            [this.plateCorners1[4][1]],
            [this.plateCorners1[3][1]]
        ]);
        feasibleRegionsA[3] = new Matrix([
            [this.plateCorners1[3][1]],
            [this.plateCorners1[1][1]]
        ]);

        let feasibleRegionsB = [];
        let feasibleRegionAnswer = [];
        for(i=0;i<feasibleRegions.length;i++){
            feasibleRegionsB[i] = feasibleRegions[i].inverse();
            feasibleRegionAnswer[i] = feasibleRegionsB[i].multiply( feasibleRegionsA[i] );
            feasibleRegionAnswer[i] = feasibleRegionAnswer[i].toArray();
        }
        for(y=0;y<myGameArea.canvas.height;y++){
            for(x=0;x<myGameArea.canvas.width;x++){
                if(Math.floor(feasibleRegionAnswer[0][0]*x+y) > Math.floor(feasibleRegionAnswer[0][1]) && Math.floor(feasibleRegionAnswer[1][0]*x+y) < Math.floor(feasibleRegionAnswer[1][1]) && Math.floor(feasibleRegionAnswer[2][0]*x+y) < Math.floor(feasibleRegionAnswer[2][1]) && Math.floor(feasibleRegionAnswer[3][0]*x+y) > Math.floor(feasibleRegionAnswer[3][1])){
                    altitudes[Math.floor(y*myGameArea.canvas.width+x)] = (values[0]*x + values[1]*y +values[2]*Math.pow(x,2)+values[3]*Math.pow(y,2));
                }
            }
        }

    }
}
function tile(x, y, altitude){
    this.altitude = altitudes[Math.floor(y*myGameArea.canvas.height+x)] + altitude - seaLevel;
    this.tempurature =  solarRadiation - 0.038*Math.abs(y - myGameArea.canvas.height/2) - (0.006*((this.altitude) - seaLevel));
    this.humidity = 10;
    this.river = 0;
    this.calculatehumidity = function(){
        this.humidity = Math.abs(2*(4 - Math.abs(y - myGameArea.canvas.height/2)/(myGameArea.canvas.height/6) + 1.5*Math.cos(Math.abs(y-myGameArea.canvas.height/2)*Math.PI/(myGameArea.canvas.height/6))) - values[((x * myGameArea.canvas.width) + y)-1].humidity/10 +this.tempurature/5 -this.altitude/100);
    };
    this.update = function() {
        ctx = myGameArea.context;
        if (Math.round(this.altitude) % 50 === 0){
            ctx.fillStyle = "black";
        } /*else if(this.altitude > 0 && this.tempurature > 0 && this.river > 800){ //rivers
            ctx.fillStyle = "lightblue"
        } */else if(this.altitude < 0 && this.tempurature < 0){ //ice sheet
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
        ctx.fillRect(x , y , pixWid, pixHei);
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
};