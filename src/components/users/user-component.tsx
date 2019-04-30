import React from 'react';
import User from '../../classes/users';
import { UserCardComponent } from './user-card-component';


interface IState {
  users: User[];
  selection: number;
  input: any;
}

export class UsersComponent extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      selection: 0,
      input: 0
    };
  }

  changeSelection = (event) => {
    this.setState({
      selection: +event.target.value
    });
  }

  changeUser = (event) => {
    this.setState({
      input: event.target.value
    });

  }

  changeList = async () => {
    switch (this.state.selection) {
      case 0: {
        const resp = await fetch('http://localhost:8081/users', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          users: body
        })
        break;
      }
      case 1: {
        const url = `http://localhost:8081/users/id/${this.state.input}`
        const resp = await fetch(url, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          users: body
        })
        break;
      }
      case 2: {
        if (isNaN(+this.state.input)) {
          const url = `http://localhost:8081/users/name/${this.state.input}`
          const resp = await fetch(url, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          this.setState({
            users: body
          });
        }
        break;
      }

      case 3: {
        if (isNaN(+this.state.input)) {
          const url = `http://localhost:8081/users/heroname/${this.state.input}`
          const resp = await fetch(url, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          this.setState({
            users: body
          })
        }
        break;
      }
      default: {
        const resp = await fetch('http://localhost:8081/users', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          users: body
        })
        break;
      }
    }
  }

  componentDidMount() {
    this.changeList();
  }

  render() {
    return (
      <div className="container">
        <input className="form-contorl" onChange={this.changeUser} />
        <select value={this.state.selection} onChange={this.changeSelection}>
          <option value={0}>All Users</option>
          <option value={1}>By ID</option>
          <option value={2}>By Name</option>
          <option value={3}>By Hero Name</option>
        </select>
        <button className="btn btn-success" onClick={this.changeList}>Get Users</button>
        <div className="row">
          {this.state.users.map(user => (
            <UserCardComponent key={user.userid} user={user} />
          ))}
        </div>
      </div>
    );
  }
}