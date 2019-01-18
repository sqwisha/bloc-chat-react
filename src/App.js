import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
