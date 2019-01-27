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
    // this.roomsRef.on('child_added', snapshot => {
    //   const room = snapshot.val();
    //   room.key = snapshot.key;

    //   this.setState({ rooms: this.state.rooms.concat( room ) });
    // });

    this.roomsRef.on('value', snapshot => {
      console.log(snapshot);
      const allRooms = snapshot.val();
      const rooms = [];

      for (let room in allRooms) {
        rooms.push({
          key: room,
          name: allRooms[room].name
        });
      }
      console.log(rooms);
      this.setState({
        rooms: rooms
      });
    });
  }

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomValue;

    this.roomsRef.push({
      name: newRoomName
    })
    .then( res => {
      this.props.handleRoomClick(res.getKey())
    })
    .catch( err => {
      console.log(err);
    });

    this.setState({
      newRoomValue: ''
    });
  }

  deleteRoom(e, roomKey) {
    e.stopPropagation();
    if (roomKey === this.props.activeRoom) {
      this.props.handleRoomDelete();
    }
    this.roomsRef.child(roomKey).remove();
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
            return(
              <li key={ room.key }
              onClick={() => this.props.handleRoomClick(room.key)}>{ room.name }<span onClick={(e) => this.deleteRoom(e, room.key) }> X </span></li>
            );
            })
          }
          </ul>
        </section>
        <form
        className="create-room"
        autoComplete="off"
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
