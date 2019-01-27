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
    this.roomsRef.on('value', snapshot => {
      const allRooms = snapshot.val();
      const rooms = [];

      for (let room in allRooms) {
        rooms.push({
          key: room,
          name: allRooms[room].name
        });
      }

      this.setState({
        rooms: rooms
      });
    });
  }

  handleChange(e) {
    const newValue = e.target.value;

    this.setState({
      newRoomValue: newValue
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

  updateRoom(roomKey) {
    const newName = {
      name: prompt('New Name:')
    };

    this.roomsRef.child(roomKey).update(newName);
  }

  deleteRoom(e, roomKey) {
    e.stopPropagation();
    if (roomKey === this.props.activeRoom) {
      this.props.handleRoomDelete();
    }
    this.roomsRef.child(roomKey).remove();
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
              onClick={() => this.props.handleRoomClick(room.key)}>
              { room.name }
                <button onClick={ () => this.updateRoom (room.key) }>
                edit
                </button>
                <button onClick={ (e) => this.deleteRoom(e, room.key) }>
                x
                </button>
              </li>
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
