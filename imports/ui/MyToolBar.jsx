import React from 'react'
import {connect} from 'react-redux'
import startBroadcast from '../actions/startBroadcast'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'


const MyToolBar = ({dispatch}) => {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <RaisedButton label="Share Video" primary={true} onMouseUp={() => dispatch(startBroadcast())}/>
                    <RaisedButton label="Watch Video" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        )
};

export default connect()(MyToolBar);