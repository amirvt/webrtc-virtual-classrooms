import React, {Component} from 'react'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'



class MyToolBar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <RaisedButton label="Share Video" primary={true}/>
                    <RaisedButton label="Share Audio" primary={true}/>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default MyToolBar;