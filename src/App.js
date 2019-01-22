import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ChatView from './components/ChatView';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAtbHX9R1SkKgVVcDs-h4w70utii2S_qQw",
  authDomain: "bloc-chat-react-81d9e.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-81d9e.firebaseio.com",
  projectId: "bloc-chat-react-81d9e",
  storageBucket: "bloc-chat-react-81d9e.appspot.com",
  messagingSenderId: "409218860186"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ''
    };
  }

  handleRoomClick(room) {
    this.setState({
      activeRoom: room
    });
  }

  render() {
    return (
      <div className="App">
        <ChatView
        firebase={ firebase }
        handleRoomClick={ (room) => this.handleRoomClick(room) }
        activeRoom={ this.state.activeRoom } />
      </div>
    );
  }
}

export default App;
