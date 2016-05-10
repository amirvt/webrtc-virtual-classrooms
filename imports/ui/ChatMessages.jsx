import React, {Component, PropTypes} from 'react'
import {List, ListItem} from 'material-ui/List';
import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider'

class ChatMessages extends Component {
    render() {
        return (
            <List >
                {this.props.messages.map(msg => {
                        return (
                            <div>
                                <ListItem
                                    primaryText={msg.date.toLocaleTimeString()}
                                    secondaryText={
                                        <p>
                                            <span style={{color: Colors.darkBlack}}>{msg.user}</span> -- {" "}
                                            {msg.message}
                                        </p>
                                    }
                                    secondaryTextLines={1}
                                >
                                </ListItem>
                                <Divider/>
                            </div>
                        )
                    }
                )}
            </List>
        )
    }

}


ChatMessages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

export default ChatMessages

