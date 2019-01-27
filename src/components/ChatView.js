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
          activeRoom={ this.props.activeRoom }
          handleRoomClick={ this.props.handleRoomClick }
          handleRoomDelete={ this.props.handleRoomDelete } />
        </div>
        <div>
          <MessageList
          firebase={ this.props.firebase }
          activeRoom={ this.props.activeRoom }
          username={ this.props.username }/>
        </div>
      </section>
    );
  }
}

export default ChatView;
