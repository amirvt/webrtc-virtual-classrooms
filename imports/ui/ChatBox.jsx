import React, {Component} from 'react'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import TextField from 'material-ui/lib/text-field'

import Divider from 'material-ui/lib/divider'
import Panel from './misc/Panel.jsx'
import ChatMessages from './ChatMessages.jsx';


const _buttonStyle = {
    float: "right"
};

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


        chatStream = Erizo.Stream({audio: false, video: false, data: true, screen: false, attributes: {type: 'chatStream', user: this.props.username}});
        chatStream.init();
        this.props.room.addEventListener('room-connected', () => {
            this.props.room.publish(chatStream);    
        });
        
        
        //TODO move to app or move callback in app to video
        this.props.room.addEventListener('stream-subscribed', streamEvent => {
            let stream = streamEvent.stream;
            if (stream.getAttributes().type === 'chatStream') {
                stream.addEventListener('stream-data', event => {
                    if (event.stream.getAttributes().type === 'chatStream') {
                        console.log(event)
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
            messages: [...this.state.messages,  message]
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

    render() {


        return (
            <Panel title="Chat Area" style={{margin: "20px"}}>
                <ChatMessages messages={this.state.messages}/>
                <Divider/>
                <div style={{padding: '30px'}}>
                    <TextField multiLine={true} hintText="Start typing yout message" style={{width: "90%"}}
                               onChange={this.onMessageType.bind(this)}/>
                    <FloatingActionButton mini={true}
                                          style={_buttonStyle}
                                          onMouseUp={this.sendMessage.bind(this)}
                                          onTouchEnd={this.sendMessage.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </Panel>
        )
    }
}

export default ChatBox