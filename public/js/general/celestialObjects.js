var gravitationalConstant = 6.67 * Math.pow(10,-11);
var speedSim = 1;
var hideLines = true;
function Celestial_Ob_Fx(x, y, mass, size, colour, name, age){
	this.mass = mass;
	this.size = size;
	this.colour = colour;
	this.x = x;
	this.y = y;
	this.energyReleased = 0;
	this.age = age;
	this.biome = 0;
	this.tempurature= 0;
	this.water=0;
	switch(this.age){
		case 1:
			if(this.mass>0.1 && this.mass<=1){
				this.energyReleased = Math.pow(this.mass,0.5)*10000000
			}else if(this.mass>1 && this.mass<=100){
				this.energyReleased =  Math.pow(this.mass,0.5)*100000000
			}else if(this.mass>100 && this.mass<=200){
				this.energyReleased =  Math.pow(this.mass,0.5)*100000000
			}
			break;
			console.log("test")
		case 2:
			this.energyReleased =  Math.pow(this.mass,0.5)*10000000
			break;
		case 3:
			this.energyReleased =  Math.pow(this.mass,0.5)*40000
			break;
		case 4:
			if(this.mass>0.1 && this.mass<=1.5){
				this.energyReleased =  Math.pow(this.mass,0.5)*40000
			}else if(this.mass>1.5 && this.mass<=3){
				this.energyReleased =  Math.pow(this.mass,0.5)*1000000
			}else if(this.mass>3 && this.mass<=200){
				this.energyReleased = 0
			}
			break;
	}

	this.name = name;
	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(this.x*zoom - screenX, this.y*zoom - screenY, this.size*zoom, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		if(ShowName == true){
		ctx.font = "20px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.fillText(this.name,this.x*zoom + this.size*zoom - screenX, this.y*zoom + (this.size*zoom * 2)/3 - screenY);
		}
	}
}
function Celestial_Ob(distance, master, mass, size, gasGiant, water, name, biome){
	this.distance = distance;
	this.master = master;
	this.mass = mass;
	this.size = size;
	this.biome = biome;
	this.gasGiant = Math.floor(gasGiant)+1;
	this.tempurature= (3*master.energyReleased*size)/(4*Math.pow(distance,3))-200;
	this.water=water;
	this.speed = Math.pow(((gravitationalConstant * master.mass)/this.distance),0.5);
	this.colour = "white";
	if(this.gasGiant == 2){
		switch(Math.round(this.water*5/1000)){
			case 0:
				this.colour = "orange";
				break;
			case 1:
				this.colour = "white";
				break;
			case 2:
				this.colour = "blue";
				break;
			case 3:
				this.colour = "grey";
				break;
			case 4:
				this.colour = "green";
				break;
			default:
				this.colour = "orange";
				break;
		}
	} else {
		if(this.tempurature<0){
			this.colour = "white";
		} else if(this.tempurature >= 100){
			this.colour="brown";
		} else if(this.tempurature>=0&&this.tempurature<100&&this.water>500){
			this.colour = "blue";
		} else if(this.tempurature>=0&&this.tempurature<50&&this.water<=500){
			this.colour = "green";
		} else{
			this.colour="brown";
		}
	}
	this.x = 0;
	this.y = 0;
	this.curcuml = 2 * this.distance * Math.PI;
	this.rt = this.curcuml/this.speed;
	this.rpt = (2 * Math.PI)/this.rt;
	this.rotations = 0;
	if(this.gasGiant ==1){
		this.name = this.colour + "-RP-"+name;
	}else if(this.gasGiant == 2) {
		this.name = this.colour + "-GG-" + name;
	}
	if(this.mass >= 1000){
	this.rotations = Math.PI;
	}
	this.height = 2*this.size;
	this.width = 2*this.size;
	this.clicked = function() {
		var clicked = true;
			//console.log(this.y + (this.height*zoom) - this.height*zoom / 2)
			if ((this.y)*zoom - screenY + (this.height*zoom) -(this.height*zoom)/2< myGameArea.y || (this.y)*zoom - screenY -(this.height*zoom)/2> myGameArea.y || (this.x)*zoom - screenX + (this.width*zoom) -(this.width*zoom)/2< myGameArea.x || (this.x)*zoom - screenX -(this.width*zoom)/2> myGameArea.x) {
			clicked = false;
		}
	return clicked;
	}
	this.update = function(){
		if(this.clicked() == true && this.gasGiant != 2){
			newSeedP = this.biome;
			newTem = this.tempurature;
			newWater = this.water;		
			console.log("test");
		}
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
		ctx.arc(master.x - screenX, master.y - screenY, this.distance, 0, 2*Math.PI);
		ctx.stroke();
		ctx.closePath();
		}
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(this.x*zoom- screenX, this.y*zoom - screenY, this.size, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		if(ShowName == true){
		ctx.font = "20px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.fillText(this.name,this.x + this.size - screenX, this.y + (this.size * 2)/3 - screenY);
		}
	}
}