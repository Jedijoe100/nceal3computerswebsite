function plot(){
	var x = document.forms["NewCoord"]["x"].value;
	var y = document.forms["NewCoord"]["y"].value;
	var colour = document.forms["NewCoord"]["colour"].value;
	var text = document.forms["NewCoord"]["text"].value;
	importantSites[importantSites.length] = new location1((x + 0.1)/10,(y + 0.1)/10,colour,text)
}
function location1(x,y,colour, text){
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.text = text;
	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x * zoom  - screenX,this.y * zoom  - screenY,3,3);
		ctx.font = "10px Comic Sans MS";
		ctx.fillStyle = this.colour;
		ctx.fillText("(" + Math.round(this.y) + "," + Math.round(this.y) + ")" + " " + this.text, this.x * zoom  - screenX + 5, this.y * zoom  - screenY+10);
	}
}
function tile(height, width, x, y, altitude){
	this.height = height;
	this.width = width;
	this.x=x;
	this.y=y;
	this.biome;
	this.altitude =  altitude - seaLevel;
	this.tempurature =  solarRadiation - 0.8*(0.1*Math.abs((this.y * 400 / myGameArea.canvas.height) - 400/2)) - (0.05*Math.abs((this.altitude) - seaLevel));
	this.humidity = 10;
	this.calculatehumidity = function(){
		this.humidity = 10 - Math.abs(this.y - myGameArea.canvas.height/2)/(myGameArea.canvas.height/12) + Math.cos(Math.abs(this.y-myGameArea.canvas.height/2)*Math.PI/(myGameArea.canvas.height/12))
		//this.humidity = 10 + (this.tempurature + 10)*(values[((x * myGameArea.canvas.width) + y)-1].humidity/10 - Math.abs(this.altitude - values[((x * myGameArea.canvas.width) + y)-1].altitude))/5.5;
	}
	this.update = function() {
		ctx = myGameArea.context;
		if (Math.round(this.altitude) % 50 == 0){
			ctx.fillStyle = "black";
		} else if(this.altitude < 0 && this.tempurature < -10){ //deep ocean
			ctx.fillStyle = "white"
		} else if(this.tempurature >= 100){ //deep ocean
			ctx.fillStyle = "brown"
		} else if(this.altitude < -(maxhieghtdiff/20)){ //deep ocean
			ctx.fillStyle = "#0000AA"
		} else if (this.altitude < 0 && this.altitude >= -(maxhieghtdiff/20)) { //ocean
			ctx.fillStyle = "#0000FF"
		} else if (this.tempurature < 0){ //Tundra
			ctx.fillStyle = "#d5d5f6"
		} else if (this.tempurature < 20 && this.tempurature >= 0 && this.humidity * 5 < 10){ //cold desert
			ctx.fillStyle = "#cc9900"
		} else if (this.tempurature > 20 && this.humidity * 5 < 30 && this.tempurature<50){ //hot desert
			ctx.fillStyle = "#ff6600"
		} else if (this.tempurature >= 0 && this.humidity * 5 >= 10 && this.tempurature < 10){ //Boreal forest
			ctx.fillStyle = "#009900"
		} else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 10 && this.humidity * 5 < 30){ //Woodland
			ctx.fillStyle = "#cc6600"
		} else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 30 && this.humidity * 5 < 60){ //Seasonal forest
			ctx.fillStyle = "#66ff66"
		} else if (this.tempurature >= 10 && this.tempurature < 20 && this.humidity * 5 >= 60){ //Temperate forest
			ctx.fillStyle = "#00cc66"
		} else if (this.tempurature >= 20 && this.humidity * 5 >= 30 && this.humidity * 5 < 60 && this.tempurature<50){ //Tropical forest
			ctx.fillStyle = "#cccc00"
		} else if (this.tempurature >= 20 && this.humidity * 5 >= 60&&this.tempurature<50){ //Tropical Rain forest
			ctx.fillStyle = "#006600"
		} else if (this.tempurature >=50&&this.tempurature<100){
			ctx.fillStyle = "brown"
		} else {
			ctx.fillStyle = "yellow"
		}
		ctx.fillRect(this.x , this.y , this.width, this.height);
	}
}