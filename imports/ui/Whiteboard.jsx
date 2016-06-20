import LC from 'literallycanvas'
import React, {Component} from 'react'

class Whiteboard extends Component {
    constructor(props) {
        super(props);
    }
    
    onInit(lc) {
        lc.on('shapeSave', shape => console.log(LC.shapeToJSON(shape.shape)));
    }

    render(){
        return <LC.LiterallyCanvasReactComponent
            imageURLPrefix="/lc/img"
            onInit={this.onInit}/>

    }
}



export default Whiteboard