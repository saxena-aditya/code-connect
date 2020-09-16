import * as Constants from '../constants/EditorContants';
import * as DS from '../utilities/algorithms';
export const  getCursorPlacementCordinates = (clickX, clickY, codeLines) => {

    let lineHight = Constants.EDITOR_CODE_LINE_HEIGHT,
    totalLineHight = codeLines.length * lineHight,
    cursorLineNum = Math.ceil(clickY / lineHight),
    totalLines = codeLines.length, lineNumber = 0, inLineDistance = 0;

    // if calculated line number if greater that 
    // total lines present in the editior
    // then the cursor will be placed in last line 
    // at the end of the line

    if(cursorLineNum > totalLines) {
        lineNumber = totalLines - 1;
    }

    return {
        x: 0,
        y: 3
    }
}  

export const getLineLengthInPixcel = (codeString, pixelMap) => {
    
    let stringLength = 0;
    const SPACE = " ";

    for(const ch of codeString) {
        if(ch in pixelMap) { 
            stringLength += pixelMap[ch]; 
            console.log("add, ", ch, pixelMap[ch], stringLength);
        }
        else if(ch === SPACE) {
            if("a" in pixelMap) {
                stringLength += pixelMap[SPACE];
                 console.log("add, ", ch, pixelMap[ch], stringLength);
            }
        }
        else 
            console.log("value not found ", ch)
    }
    return stringLength;
}

export const generatePixelMap = (fontSize, fontFamily) => {
    
    let letterLength = {};

    for (let letter of Constants.CHAR_KEYS) {
        let span = document.createElement('span');
        span.append(document.createTextNode(letter));
        span.style.fontSize = fontSize + "px";
        span.style.fontFamily = fontFamily;
        document.body.append(span);
        letterLength[letter] = span.offsetWidth;

        //span.remove();
    }

    letterLength[" "] = letterLength["_"];
    console.log("inside, ", letterLength);
    return letterLength;
}

export const isCharacterKey = (keyCode) => {

    if(keyCode >= Constants.CAPS_OFF_A 
        && keyCode <= Constants.CAPS_OFF_Z)
        return true;
    
    if(keyCode >= Constants.CAPS_ON_A 
        && keyCode <= Constants.CAPS_ON_Z)
        return true;

    if(keyCode >= Constants.DIGITS_START 
        && keyCode <= Constants.DIGITS_END)
        return true;
    
    // also return true for keys like "-", "=", ".", "/", 
    return Constants.SYMBOL_KEYS.includes(keyCode);
}

export const correctCursorPositionAccordingToCodeString = (codeString, currentX, pixelMap) => {

    let charLenghts = Array(codeString.length).fill(0);
    [...codeString].map((ch, index) => {

        if(ch in pixelMap) {
            charLenghts[index] = (index == 0) ? pixelMap[ch] : charLenghts[index-1] + pixelMap[ch];
        } else {
            console.warn("CODE LINE: ", codeString, " ", ch , " not supported.");
        }

    });
    
    const totalCodeLengthInPixel = charLenghts[charLenghts.length - 1];
    console.log("charlengths", charLenghts);
    // find place where we have to insert the cursor
    let correctedX = DS.binarySearch(charLenghts, currentX);
    console.log("retuning ", correctedX)
   
    
    return {
        index: correctedX,
        pixelVal: charLenghts[correctedX]
    };
}