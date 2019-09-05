var seed = 123748;
var cell = new Array();
var resolution = 10;
var changeFactor = 100;
var ctx;
var width =  screen.width+400;
var height = screen.width+400;
function LoadBackground() {
    ctx = document.getElementById('background').getContext("2d");
    document.getElementById("background").width = width;
    document.getElementById("background").height = height;
    noise.seed(Math.random());
    for(x = 0;x < width/resolution+1;x++){
        for(y=0;y< height/resolution;y++){
            cell[x + y*height/resolution] = new Array();
            cell[x + y*height/resolution][0] = Math.round(Math.abs(noise.perlin2(x / (changeFactor/resolution), y / (changeFactor/resolution))+1/2*noise.perlin2(x / (changeFactor*2/resolution), y / (changeFactor*2/resolution))+1/4*noise.perlin2(x / (4*changeFactor/resolution), y / (4*changeFactor/resolution))*255));
        }
    }
    noise.seed(Math.random());
    for(x = 0;x < width/resolution + 1;x++){
        for(y=0;y< height/resolution;y++){
            cell[x + y*height/resolution][1] = Math.round(Math.abs(noise.perlin2(x / (changeFactor/resolution), y / (changeFactor/resolution))+1/2*noise.perlin2(x / (changeFactor*2/resolution), y / (changeFactor*2/resolution))+1/4*noise.perlin2(x / (changeFactor*4/resolution), y / (4*changeFactor/resolution))*255));
        }
    }
    noise.seed(Math.random());
    for(x = 0;x < width/resolution+1;x++){
        for(y=0;y< height/resolution;y++){
            cell[x + y*height/resolution][2] = Math.round(Math.abs(noise.perlin2(x / (changeFactor/resolution), y / (changeFactor/resolution))+1/2*noise.perlin2(x / (changeFactor*2/resolution), y / (changeFactor*2/resolution))+1/4*noise.perlin2(x / (4*changeFactor/resolution), y / (4*changeFactor/resolution))*255));
        }
    }
    for(i=0;i<cell.length;i++){
        test(cell[i][0],cell[i][1],cell[i][2],i);
    }
    document.body.style.backgroundImage = "url("+document.getElementById('background').toDataURL()+")";
}
function test(a,b,c,d){
    ctx.fillStyle="rgb("+a+","+b+","+c+")";
    ctx.fillRect((d%(height/resolution))*resolution,Math.floor(d*resolution/height)*resolution, resolution, resolution);
}