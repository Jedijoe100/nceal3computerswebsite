//name Generator
//randomly selects 8 of the 38 characters and adds them to make a single name
function nameGenerator(length, rnd){
var name = "";
var rand = new Random(rnd);
for(i = 0; i < length; i++){
var rnd = Math.floor(rand.nextFloat() * 38);
switch(rnd){
case 1: name += "1"; break;
case 2: name += "2"; break;
case 3: name += "3"; break;
case 4: name += "4"; break;
case 5: name += "5"; break;
case 6: name += "6"; break;
case 7: name += "7"; break;
case 8: name += "8"; break;
case 9: name += "9"; break;
case 10: name += "0"; break;
case 11: name += "-"; break;
case 12: name += "Q"; break;
case 13: name += "W"; break;
case 14: name += "E"; break;
case 15: name += "R"; break;
case 16: name += "T"; break;
case 17: name += "Y"; break;
case 18: name += "U"; break;
case 19: name += "I"; break;
case 21: name += "O"; break;
case 22: name += "P"; break;
case 23: name += "A"; break;
case 24: name += "S"; break;
case 25: name += "D"; break;
case 26: name += "F"; break;
case 27: name += "G"; break;
case 28: name += "H"; break;
case 29: name += "J"; break;
case 30: name += "K"; break;
case 31: name += "L"; break;
case 32: name += "Z"; break;
case 33: name += "X"; break;
case 34: name += "C"; break;
case 35: name += "V"; break;
case 36: name += "B"; break;
case 37: name += "N"; break;
case 38: name += "M"; break;
}
}
return name;
}