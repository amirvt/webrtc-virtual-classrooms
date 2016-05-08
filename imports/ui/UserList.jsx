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
            <Panel title="Current Users" style={{margin: "0px"}}>
                <div style={{"overflowY": "scroll", height: "80%"}}>
                    <List >
                        {this.renderUsers()}
                    </List>
                </div>
            </Panel>
        )
    }
}

export default UserList