import React from 'react';
import { EDITOR_CODE_LINE_HEIGHT } from '../constants/EditorContants';
import CodeLine from './CodeLine';
import { generatePixelMap } from '../utilities/index'

class Editor extends React.Component{

    constructor(props) {
        super();
        this.state = {
            lines:[],
            lineHeight: EDITOR_CODE_LINE_HEIGHT,
            cursorX: 0,
            cursorY: 0,
            fontSize: 15,
            fontFamily: 'Consolas',
            pixelMap: {}
        };

         this.state.pixelMap = generatePixelMap(this.state.fontSize, this.state.fontFamily)
        this.state.lines = [
            <CodeLine text="int n = arr.size();" pm={this.state.pixelMap} />,
            <CodeLine text="int length = solve(a, f, g);" pm={this.state.pixelMap} />,
            <CodeLine text="if(i == j) { return false;}" pm={this.state.pixelMap} />

        ];
    }

    componentDidMount() {
       
    }

    keyPressed = (event) => {
        console.log("you stated typing")
       

    }

    setCursor = (e) => {
    

    }
    
    render() {
        return (
            <div className="editor-container">
                <div className="editor" tabIndex="0" onKeyDown={this.keyPressed} onClick={this.setCursor}>
                   {/*  <div className="number-line">
                        {this.state.lines.map((line, id) => <p>{id}</p>)}
                    </div> */}
                    <div className="content">
                        {this.state.lines.map(line => line)}

                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;