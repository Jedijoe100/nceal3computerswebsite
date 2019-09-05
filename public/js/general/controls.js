function controls(){
	var speed = 10;
	
	if (myGameArea.keys && myGameArea.keys[65] && screenX > 0) {screenX -= speed; }
    if (myGameArea.keys && myGameArea.keys[68] && screenX < (scrollwidth * (zoom - minzoom))) {screenX += speed; }
    if (myGameArea.keys && myGameArea.keys[87] && screenY > 0) {screenY -= speed; }
    if (myGameArea.keys && myGameArea.keys[83] && screenY < (scrollwidth * (zoom - minzoom))) {screenY += speed; }
	var currentXpercent = screenX/(scrollwidth * (zoom - minzoom));
	var currentYpercent = screenY/(scrollwidth * (zoom - minzoom));
	if (myGameArea.keys && myGameArea.keys[187] && zoom > minzoom) {zoom -= zoomaspect; screenX=currentXpercent*(scrollwidth * (zoom - minzoom)); screenY=currentYpercent*(scrollwidth * (zoom - minzoom));}
	if (myGameArea.keys && myGameArea.keys[189] && zoom < 1) {zoom += zoomaspect; screenX += 500; screenY += 500;}
}