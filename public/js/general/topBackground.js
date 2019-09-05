let i,l;
const size=10;
const density=4;
const varience =1/10;
const ampsize = 2;
const fresize = 1/100;
const width1 = screen.width;
const height1 = 50;
let ctx1;
function genertateTopBackground() {
    ctx1 = document.getElementById('background1').getContext("2d");
    document.getElementById("background1").width = width1;
    document.getElementById("background1").height = height1;
    let f = 1;
    let a = 1;
    let b = 0.1;
    for(n=-5,m=height1/density;n<m;n++){
        a += (Math.random()-1/2);
        f += (Math.random()-1/2)/10;
        b += (Math.random()-1/2)-b*Math.pow(Math.abs(b),0.5)/Math.abs(b)*varience;
        sinFunctions(a*ampsize,f*fresize,n*density, b*(Math.exp(-Math.pow(b,2))-1)/(2*Math.abs(b))+1/2);
    }
    document.getElementById("foot").style.backgroundImage = "url("+document.getElementById('background1').toDataURL()+")";
    document.getElementById("top").style.backgroundImage = "url("+document.getElementById('background1').toDataURL()+")";
}
function sinFunctions(amplitude, frequency, start, colour) {
    for(i=0,l=width1*10;i<l;i++){
        ctx1.fillStyle = 'rgba('+(150+colour*105)+','+(150+colour*105)+',0,'+1+')';
        ctx1.fillRect(i/10,(amplitude*Math.sin(i/10*frequency)+start),size,size);
    }
}