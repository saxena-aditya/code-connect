import { EDITOR_CODE_LINE_HEIGHT } from '../constants/EditorContants'
export const  getCursorPlacementCordinates = (clickX, clickY, codeLines) => {

    let lineHight = EDITOR_CODE_LINE_HEIGHT,
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
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", "$", " ", ";", "<", ">", "(", ")", "{", "}", "->", ".", "|", "&", "^", "%", "/", "#", "@", "!", ",", "[", "]", "'", "\"","*", "_", "+", "-"];
    let letterLength = {};

    for (let letter of letters) {
        let span = document.createElement('span');
        span.append(document.createTextNode(letter));
        span.style.fontSize = fontSize + "px";
        span.style.fontFamily = fontFamily;
        document.body.append(span);
        letterLength[letter] = span.offsetWidth;

        // hack for space
        if(letter === " ") {
            letterLength[" "] = letterLength["a"];
        }
        
        span.remove();
    }

    console.log("inside, ", letterLength);
    return letterLength;
}