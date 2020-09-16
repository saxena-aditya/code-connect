import React from 'react';
import Cursor from './Cursor';
import { EDITOR_CODE_LINE_HEIGHT } from '../constants/EditorContants';
import * as utils from '../utilities/index'

class CodeLine extends React.Component {

    constructor(props) {
        super();
        this.state = {
            text: props.text,
            width: 0,
            height: EDITOR_CODE_LINE_HEIGHT,
            showCursor: false,
            cursorX: 0,
            cursorY: 0,
            codeStringIndex: 0

        };
    }

    clicked = (e) => {
        e.preventDefault();
        console.log("cliked on a line..." , this.state.text);
        console.log("place cursor here");
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            codeLineLength = utils.getLineLengthInPixcel(this.state.text, this.props.pm);

        let correctedX = utils.correctCursorPositionAccordingToCodeString(this.state.text, x, this.props.pm);
        this.setState({
          showCursor: true,
          cursorX: correctedX.pixelVal,
          codeStringIndex: correctedX.index,
          cursorY: 0,
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
        let sepration = this.state.codeStringIndex;

        console.log(sepration, this.state.text[sepration], ' => seperation ')
       
        let left = codeString.substr(0, sepration+1),
            right = codeString.substr(sepration+1, codeString.length),
            keyCode = e.keyCode || e.which,
            keyPressed = String.fromCharCode(keyCode);
        

        console.log('keycode' , keyCode);
        
        console.log(e.shiftKey)
        if(utils.isCharacterKey(keyCode)) {

            console.log(left, right, 'key pressed => ', String.fromCharCode(e.keyCode));
            this.setState({
                text: left + keyPressed + right,
                cursorX: currentCursorPosition + this.props.pm[keyPressed] + .25,
                codeStringIndex: this.state.codeStringIndex + 1
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