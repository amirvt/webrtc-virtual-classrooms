import React, {Component} from 'react'

import Panel from './misc/Panel.jsx'
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {connect} from 'react-redux'


const mapStateToProps = state => ({
   users: state.users
});

class UserList extends Component {


    renderUsers() {
        return this.props.users.map(user => {
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

export default connect(mapStateToProps)(UserList)