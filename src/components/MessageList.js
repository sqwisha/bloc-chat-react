import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageInput: ''
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

  handleMessageChange(e) {
    const message = e.target.value;

    this.setState({
      messageInput: message
    });
  }

  addMessage(e) {
    e.preventDefault();

    const newMessage = {
      content: this.state.messageInput,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom,
      username: this.props.username
    };

    this.messagesRef.push(newMessage);

    this.setState({
      messageInput: ''
    });
  }

  render() {
    return(
      <div id="messages-container">
        <section id="message-display">
          <ul>
            {
              this.activeRoomMessages().map( (message) => {
                return <li key={message.key}>{message.content}
                <em> - {message.username}</em>
                </li>;
              } )
            }
          </ul>
        </section>
        {
          (this.props.activeRoom !== '')
          ?
          <form id="message-input"
          onSubmit={ (e) => this.addMessage(e) }>
          <input type="text"
          value={ this.state.messageInput }
          placeholder="Write your message here"
          onChange={ (e) => this.handleMessageChange(e) } />
          <input type="submit" value="Submit" />
          </form>
          :
          null
        }
      </div>
    );
  }
}

export default MessageList;
