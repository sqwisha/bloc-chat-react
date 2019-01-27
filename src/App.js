import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ChatView from './components/ChatView';
import User from './components/User';

// Initialize Firebase
const config = {
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
      activeRoom: '',
      username: 'Guest',
      authData: ''
    };
  }

  setUser() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup( provider )
      .then( result => {
        const user = result.user;

        this.setState({
          username: user.displayName,
          authData: user
        });
      } )
      .catch( error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;

        console.log(
          `Error Code:${errorCode}
          Error Message: ${errorMessage}
          Email: ${email}
          Credential: ${credential}`);
      } );
  }

  signOut() {
    firebase.auth().signOut()
      .then( () => {
        this.setState({
          username: 'Guest'
        });
      })
      .catch( ( (error) => {
        console.log(`There was an error: ${error}`);
      } ));
  }

  handleRoomClick(room) {
    this.setState({
      activeRoom: room
    });
  }

  handleRoomDelete() {
    this.setState({
      activeRoom: ''
    });
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={ firebase }
          setUser={ () => this.setUser() }
          signOut={ () => this.signOut() }
          username={ this.state.username } />
        <ChatView
          firebase={ firebase }
          handleRoomClick={ (room) => this.handleRoomClick(room) }
          activeRoom={ this.state.activeRoom }
          handleRoomDelete={ () => this.handleRoomDelete() }
          username={ this.state.username } />
      </div>
    );
  }
}

export default App;
