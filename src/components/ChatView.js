import React, { Component } from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';

class ChatView extends Component {
  render() {
    return(
      <section id="chat-view">
        <div>
          <RoomList
          firebase={ this.props.firebase }
          handleRoomClick={ this.props.handleRoomClick } />
        </div>
        <div>
          <MessageList
          firebase={ this.props.firebase }
          activeRoom={ this.props.activeRoom } />
        </div>
      </section>
    );
  }
}

export default ChatView;
