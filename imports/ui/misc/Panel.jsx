import React, {Component, PropTypes} from 'react'


import AppBar from 'material-ui/lib/app-bar'
import Paper from 'material-ui/lib/paper'


class Panel extends Component {
    render() {

        return (
            <Paper zDepth={1} style={this.props.style}>
                <AppBar title={this.props.title}/>
                {this.props.children}
            </Paper>
        )
    }
}

Panel.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object
};

export default Panel