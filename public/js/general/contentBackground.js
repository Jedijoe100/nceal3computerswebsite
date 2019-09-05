const width2 = 50;
const height2 = 50;
const plantNum = width2*height2/10;
const maxSize = 10;
let ctx2;
function generateContentBackground() {
    ctx2 = document.getElementById('background2').getContext("2d");
    document.getElementById("background2").width = width2;
    document.getElementById("background2").height = height2;
    for(i = 0, l = plantNum;i<l;i++){
        plant(Math.random()*width2, Math.random()*height2,Math.random()*maxSize, Math.random());
        console.log("test");
    }

    document.getElementById("content").style.backgroundImage = "url("+document.getElementById('background2').toDataURL()+")";
}
function plant(x,y,size,colour){
    ctx2.fillStyle = 'rgba(0,'+(100+colour*155)+',0,0.2)';
    ctx2.beginPath();
    ctx2.arc(x,y,size,0,2*Math.PI);
    ctx2.fill();
}