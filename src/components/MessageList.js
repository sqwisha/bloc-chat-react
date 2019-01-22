import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  activeRoomMessages() {
    return this.state.messages.filter( (message) => {
      return message.roomId === this.props.activeRoom;
    } );
  }

  render() {
    return(
      <section id="message-display">
        <ul>
          {
            this.activeRoomMessages().map( (message) => {
              return <li key={message.key}>{message.content}</li>;
            } )
          }
        </ul>
      </section>
    );
  }
}

export default MessageList;
