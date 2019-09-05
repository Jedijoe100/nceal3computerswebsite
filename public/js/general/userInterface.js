
function sidebar(x,y,width,height){
this.x = x;
this.y = y;
this.width = width;
this.height = height;
//this.
}
function coords(x, y){
	this.update = function(){
		ctx = myGameArea.context;
		ctx.font = "20px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.fillText(Math.round(screenX * zoom), x, y);
		ctx.fillText(Math.round(screenY * zoom), x, y + 20);
	}
}
function miniMap(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.update = function(){
		ctx = myGameArea.context;
		ctx.strokeStyle = "white";
		ctx.fillStyle = "black";
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.stroke();
		for(c =1; c<planets.length;c++){
			var pointX = (planets[c].x - systemCenter)/zoom + systemWidth/2;
			//console.log(pointX);
			var pointY = (planets[c].y - systemCenter)/zoom + systemHeight/2;
			if(pointX/systemWidth > 1 || pointX/systemWidth < 0 || pointY/systemWidth < 0 || pointY/systemWidth > 1){
				
			}else{
			ctx.fillStyle = "white";
			ctx.fillRect((pointX/systemWidth)*this.width + this.x,(pointY/systemHeight)*this.height + this.y,1,1);
			}
		}
		ctx.fillRect(this.width/2 + this.x,this.height/2 + this.y,1,1);
		ctx.strokeStyle = "grey";
		ctx.rect((screenX/(systemWidth*zoom))*this.width,(screenY/(systemHeight*zoom))*this.height,(this.width/systemRatio)*Math.pow(zoom, -1),(this.height/systemRatio)*Math.pow(zoom, -1));
		ctx.stroke();
	}
}