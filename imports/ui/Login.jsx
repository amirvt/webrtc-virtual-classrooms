import React, {Component} from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

class LoginForm extends Component {

constructor(props){
    super(props);
    this.state = {
        userId: "",
        meetingId: ""
    }
}

    handleChange(event) {
        console.log(event.target.value);
        this.setState({userId: event.target.value});
    }

    handleMeetingChange(event) {
        console.log(event.target.value);
        this.setState({meetingId: event.target.value});
    }

    handleSubmit() {
        //this.props.dispacth(loginAction(this.state.meetingId, this.state.userId));
        console.log('logging in...')
        browserHistory.push(`/:${this.state.meetingId}:${this.state.userId}`);
    };

    render() {

        return (
            <div>
                <TextField hintText="User Id" onChange={this.handleChange.bind(this)}/>
                <br/>
                <TextField hintText="Meeting Id" onChange={this.handleMeetingChange.bind(this)}/>
                <br/>
                <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onMouseUp={this.handleSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default LoginForm