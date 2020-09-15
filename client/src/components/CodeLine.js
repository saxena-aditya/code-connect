import React from 'react';
import Cursor from './Cursor';
import { EDITOR_CODE_LINE_HEIGHT } from '../constants/EditorContants';
import { getLineLengthInPixcel } from '../utilities/index'

class CodeLine extends React.Component {

    constructor(props) {
        super();
        this.state = {
            text: props.text,
            width: 0,
            height: EDITOR_CODE_LINE_HEIGHT,
            showCursor: false,
            cursorX: 0,
            cursorY: 0

        };
    }

    clicked = (e) => {
        e.preventDefault();
        console.log("cliked on a line..." , this.state.text);
        console.log("place cursor here");
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            codeLineLength = getLineLengthInPixcel(this.state.text, this.props.pm);


        if(x > codeLineLength) {
            x = codeLineLength + 5;
        }

        this.setState({
            showCursor: true,
            cursorX: x,
            cursorY: 0
        });

        console.log("code length is => " , codeLineLength);
    }

    blurred = (e) => {
        e.preventDefault();
    
        this.setState({
            showCursor: false
        });
    }

    typing = (e) => {
        // get the current cursor location and try to find the world where 
        // we need to start typing form


        const currentCursorPosition = this.state.cursorX;
        let codeString = this.state.text;
        let offsetX = 0;
        let sepration = 0;
        for(const ch of this.state.text) {

            if(ch in this.props.pm) {
                if(offsetX < currentCursorPosition && (offsetX + this.props.pm[ch] > currentCursorPosition)) {
                    break;
                }
                offsetX += this.props.pm[ch];
                sepration++;
            }
        }

        console.log(this.state.text[sepration], ' => seperation ')
       
        let left = codeString.substr(0, sepration),
            right = codeString.substr(sepration, codeString.length),
            keyCode = e.keyCode || e.which,
            keyPressed = String.fromCharCode(keyCode);
        

        console.log('keycode' , keyCode);
        const usedSymbolCodes = [32, 220, 219, 221, 220, 190, 42, 43, 95, 40, 41, 42, 38, 94, 37, 36, 35, 64, 33];
        console.log(e.shiftKey)
        if((keyCode >= 65 && keyCode <= 90) 
            || (keyCode >= 48 && keyCode <= 57)
            || (e.shiftKey && usedSymbolCodes.includes(keyCode))) {

            console.log(left, right, 'key pressed => ', String.fromCharCode(e.keyCode));
            this.setState({
                text: left + keyPressed + right,
                cursorX: currentCursorPosition + this.props.pm[keyPressed]
            });
        }
        else if(keyCode == 32) {
            e.preventDefault();
            this.setState({
                text: left + keyPressed + right,
                cursorX: currentCursorPosition + this.props.pm[keyPressed]
            });
        }
      
    }
    render() {
        console.log('new state', this.state);
        return (
            <div 
                className="code-line" 
                
                onClick={this.clicked}
                onBlur={this.blurred}
                onKeyPress={this.typing}
                tabIndex="0"
                contentEditable={this.isEditable}
                id="asd"
                >
                {<span style={{ fontSize: '15px', fontFamily: 'Consolas, Source Code Pro' }}>{this.state.text}</span>}
                    {this.state.showCursor ? <Cursor 
                        x = {this.state.cursorX} 
                        y = {this.state.cursorY} /> : ""}
                </div>
            
        );
    }
}

export default CodeLine;