function colourGenerator(rmin, rmax, bmin, bmax, gmin, gmax, rnd1, rnd2, rnd3){
	var Red = Math.round((rnd1 * (rmax - rmin)) + rmin);
	var Blue = Math.round(rnd2 * (bmax - bmin) + bmin);
	var Green = Math.round(rnd3 * (gmax - gmin) + gmin);
	var hexadecimalValue = "#"
	switch(Math.floor(Red / 15)){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	switch(Math.floor(Red - (Red / 15))){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	switch(Math.floor(Blue / 15)){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	switch(Math.floor(Blue - (Blue / 15))){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	switch(Math.floor(Green / 15)){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	switch(Math.floor(Green - (Green / 15))){
		case 0: hexadecimalValue += "0"; break;
		case 1: hexadecimalValue += "1"; break;
		case 2: hexadecimalValue += "2"; break;
		case 3: hexadecimalValue += "3"; break;
		case 4: hexadecimalValue += "4"; break;
		case 5: hexadecimalValue += "5"; break;
		case 6: hexadecimalValue += "6"; break;
		case 7: hexadecimalValue += "7"; break;
		case 8: hexadecimalValue += "8"; break;
		case 9: hexadecimalValue += "9"; break;
		case 10: hexadecimalValue += "A"; break;
		case 11: hexadecimalValue += "B"; break;
		case 12: hexadecimalValue += "C"; break;
		case 13: hexadecimalValue += "D"; break;
		case 14: hexadecimalValue += "E"; break;
		case 15: hexadecimalValue += "F"; break;
		default: hexadecimalValue += "0"; break;
	}
	return hexadecimalValue;
}