import React, {PropTypes} from 'react';

import Message from './message';
import EnterMessage from './entermessage';

import io from 'socket.io-client';

const socket = io('', { path: '/api/chat'});

import { getMessages } from './../api/chatroom/messageRequest.js';

class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };

    socket.on('new bc message', (message) => {
      this.setState({
        messages: [...this.state.messages, { user: message.user, text: message.text, id: this.state.messageid }]
      });    
    });
  }

  componentDidMount() {
  // fetch all messages from DB
    console.log('getting data now');
    console.log(getMessages('anicknam/gittalk'));
    // .then(messages => console.log('messages', messages))
    // .catch(err => throw err);
  }

  render(){
    return (
      <div>
        <h1>Messages!</h1>
        <ul>
          {this.state.messages.map(message => <Message user={message.user} text={message.text} />)}
        </ul>
        <EnterMessage username={this.props.username} socket={socket}/>
      </div>
    );
  }
}

const styles = {
};

export default Messages;