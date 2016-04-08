import React, {Component} from 'react'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field'
import * as Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider'
import Panel from './misc/Panel.jsx'

const _buttonStyle = {
    float: "right",
};


class ChatBox extends Component {
    getChatMessages() {
        return [
            {username: "Alan Wake", text: "hello!", date: new Date()},
            {username: "Gholam Ahmadi", text: "hello!", date: new Date()},
            {username: "Asghar Gholami", text: "hello!", date: new Date()},
            {username: "Javad Javadi", text: "hello!", date: new Date()},
            {username: "Alan Wake", text: "hello!", date: new Date()},
            {username: "Gholam Ahmadi", text: "hello!", date: new Date()},
            {username: "Asghar Gholami", text: "hello!", date: new Date()},
            {username: "Javad Javadi", text: "hello!", date: new Date()},
        ]
    }

    renderChatMessages() {
        return this.getChatMessages().map(msg => {
            return (
                <div>
                    <ListItem
                        primaryText={msg.date.toLocaleTimeString()}
                        secondaryText={
                            <p>
                                <span style={{color: Colors.darkBlack}}>{msg.username}</span> --
                                {msg.text}
                            </p>
                        }
                        secondaryTextLines={1}
                    >
                    </ListItem>
                    <Divider/>
                </div>
            )
        })
    }


    render() {
        return (
            <Panel title="Chat Area">
                <List style={{"overflowY": "scroll", height: "300px"}}>
                    {this.renderChatMessages()}
                </List>
                <Divider/>
                <div style={{padding: '30px'}}>
                    <TextField multiLine={true} hintText="Start typing yout message" style={{width: "90%"}}/>
                    <FloatingActionButton mini={true} style={_buttonStyle}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </Panel>
        )
    }
}

export default ChatBox