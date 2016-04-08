import React, {Component} from 'react'

import Panel from './misc/Panel.jsx'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';


class UserList extends Component {
    getUsers() {
        return [
            {username: "Eric Hoffman"},
            {username: "Grace Ng"},
            {username: "Karem Suer"},
            {username: "Asghar Gholami"},
            {username: "Eric Hoffman"},
            {username: "Grace Ng"},
            {username: "Karem Suer"},
            {username: "Asghar Gholami"},
        ]
    }


    renderUsers() {
        return this.getUsers().map(user => {
            return (
                <ListItem primaryText={user.username}
                          rightIcon={<CommunicationChatBubble/>}/>
            )
        })
    }

    render() {
        return (
            <Panel title="Current Users">
                <List style={{"overflowY": "scroll", height: "300px"}}>
                    {this.renderUsers()}
                </List>
            </Panel>
        )
    }
}

export default UserList