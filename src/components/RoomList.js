import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomValue: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({ rooms: this.state.rooms.concat( room ) });
    });

    this.roomsRef.on('value', snapshot => {
      this.render();
    });
  }
  //TODO add componentWillUnmount - ref.off()?

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomValue;

    this.roomsRef.push({
      name: newRoomName
    });

    this.setState({
      newRoomValue: ''
    });
  }

  handleChange(e) {
    const newValue = e.target.value;

    this.setState({
      newRoomValue: newValue
    });
  }

  render() {
    return(
      <section id="chat-rooms">
        <section className="list-rooms">
          <ul>
          {
            this.state.rooms.map( (room) => {
            return <li key={room.key}>{room.name}</li>;
            })
          }
          </ul>
        </section>
        <form className="create-room"
        onSubmit={ (e) => this.createRoom(e) }>
          <label>Create New Room
            <input id="newRoom"
            type="text"
            placeholder="New Room Name"
            value={ this.state.newRoomValue }
            onChange={ (e) => this.handleChange(e) }  />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </section>
    );
  }
}

export default RoomList;
