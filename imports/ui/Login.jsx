import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import loginAction from '../actions/loginAction'


class LoginForm extends Component {

constructor(props){
    super(props);
    this.state = {
        username: "",
        roomName: ""
    }
}

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleMeetingChange(event) {
        this.setState({roomName: event.target.value});
    }

    handleSubmit() {
        console.log('logging in...');
        Meteor.call('getOrCreateRoom', this.state.roomName, this.state.username, "presenter", (error, token) => {
            if (error) {
                alert(error);
                return
            }
            this.props.dispatch(
                loginAction(
                    this.state.roomName,
                    this.state.username,
                    token
                )
            );
        });
        
    };

    render() {

        return (
            <div>
                <TextField hintText="Username" onChange={this.handleChange.bind(this)}/>
                <br/>
                <TextField hintText="Room Name" onChange={this.handleMeetingChange.bind(this)}/>
                <br/>
                <FlatButton
                    label="Submit"
                    primary={true}
                    //keyboardFocused={true}
                    onMouseUp={this.handleSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default connect()(LoginForm)