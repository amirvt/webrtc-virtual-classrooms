import React, {Component} from 'react'


import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import Paper from 'material-ui/lib/paper'



class Panel extends Component {
    render(){
        let _style = this.props.style || {};
        _style.margin = "10px";
        
        return (
            <Paper zDepth={1} style={_style}>
                <Toolbar>
                    <ToolbarGroup  float="left">
                        <ToolbarTitle text={this.props.title}/>
                    </ToolbarGroup>
                </Toolbar>
                {this.props.children}
            </Paper>
        )
    }
}

export default Panel