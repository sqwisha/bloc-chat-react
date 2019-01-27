import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageInput: '',
      messageEdit: false
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('value', snapshot => {
      const allMessages = snapshot.val();
      const messages = [];

      for (let message in allMessages) {
        messages.push({
          key: message,
          content: allMessages[message].content,
          sentAt: allMessages[message].sentAt,
          roomId: allMessages[message].roomId,
          username: allMessages[message].username
        });
      }

      this.setState({
        messages: messages
      });
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

  editMessage(messageKey) {
    const currentMessage = this.state.messages.find((message) => {
      return message.key === messageKey
    }).content;

    this.setState({
      messageEdit: true,
      messageInput: currentMessage
    });
  }

  updateMessage(e, messageKey) {
    e.preventDefault();

    const newMessage = {
      content: this.state.messageInput
    };

    this.messagesRef.child(messageKey).update(newMessage);

    this.setState({
      messageEdit: false,
      messageInput: ''
    });
  }

  deleteMessage(messageKey) {
    this.messagesRef.child(messageKey).remove();
  }

  render() {
    return(
      <div id="messages-container">
        <section id="message-display">
          <ul>
            {
              this.activeRoomMessages().map( (message) => {
                return (
                  <li key={message.key}>
                  {message.username}:
                  { (this.state.messageEdit)
                    ?
                    (<form onSubmit={ (e) => this.updateMessage(e, message.key) }>
                      <input type="textarea"
                      value={this.state.messageInput}
                      onChange={ (e) => this.handleMessageChange(e) } />
                      <input type="submit" value="Done" />
                    </form>)
                    :
                    (<span>{message.content}
                      <button onClick={ () => this.editMessage(message.key) }>
                      edit
                      </button>
                      <button onClick={ () => this.deleteMessage(message.key) }>
                      x
                      </button>
                    </span>)
                  }
                  </li>
                );
              } )
            }
          </ul>
        </section>
        {
          (this.props.activeRoom !== '' && !this.state.messageEdit)
          ?
          (<form id="message-input"
          onSubmit={ (e) => this.addMessage(e) }>
          <input type="text"
          value={ this.state.messageInput }
          placeholder="Write your message here"
          onChange={ (e) => this.handleMessageChange(e) } />
          <input type="submit" value="Submit" />
          </form>)
          :
          null
        }
      </div>
    );
  }
}

export default MessageList;
