import React, {Component} from 'react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';

import TextField from 'material-ui/TextField'

import Divider from 'material-ui/Divider'
import Panel from './misc/Panel.jsx'
import ChatMessages from './ChatMessages.jsx';
import {StreamType} from "../consts";


let chatStream = {};
let i = 1;
//let messages = [];


class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: []
        };


        chatStream = Erizo.Stream({
            audio: false,
            video: false,
            data: true,
            screen: false,
            attributes: {type: StreamType.CHAT, user: this.props.username}
        });
        chatStream.init();
        this.props.room.addEventListener('room-connected', () => {
            this.props.room.publish(chatStream);
        });


        
        this.props.room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            if (stream.getAttributes().type === StreamType.CHAT) {
                stream.addEventListener('stream-data', event => {
                    if (event.stream.getAttributes().type === StreamType.CHAT) {
                        this.formatAndShowMessage(event.msg, stream.getAttributes().user);
                    }
                });
            }
        })
    }

    formatAndShowMessage(message, user = this.props.username) {
        message.date = new Date();
        message.key = i++;
        message.user = user;
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    sendMessage() {
        let messageObject = {
            message: this.state.message
        };
        chatStream.sendData(messageObject);
        this.formatAndShowMessage(messageObject);
    }

    onMessageType(event) {
        this.setState({message: event.target.value})
    }

    checkCtrlEnter(event) {
        if(event.ctrlKey && event.keyCode == 13) {
            this.sendMessage()
        }
    }

    render() {


        return (
            <Panel title="Chat Area">
                <div style={{"overflowY": "scroll", height: "80%"}}>
                    <ChatMessages messages={this.state.messages}/>
                </div>
                <Divider/>
                <div style={{padding: '30px', position: "absolute", bottom: 0, width: "90%"}}>
                    <TextField multiLine={true} hintText="Start typing your message" 
                               onChange={this.onMessageType.bind(this)}
                               style={{width: "70%"}}/>
                    <FloatingActionButton mini={true}
                                          style={{float: "right"}}
                                          onMouseUp={this.sendMessage.bind(this)}
                                          onTouchEnd={this.sendMessage.bind(this)}
                                            onKeyPress={this.checkCtrlEnter.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </Panel>
        )
    }
}

export default ChatBox