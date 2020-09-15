import React from 'react'
import { EDITOR_CODE_LINE_HEIGHT } from '../constants/EditorContants';

class Cursor extends React.Component {

    constructor(props) {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className="cursor" 
                style={{
                    top: this.props.y,
                    left: this.props.x
                }}>

            </div>
        );
    }
}

export default Cursor;