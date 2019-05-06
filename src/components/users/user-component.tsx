import React from 'react';
import { UserCardComponent } from './user-card-component';
import { Subscription } from 'rxjs';
import User from '../../classes/users';
import { $currentUser } from '../../streams/user-stream';
import { UserProfileComponent } from './user-profile-component';

interface IState {
  users: User[];
  selection: number;
  roleSelection: string;
  input: any;
  signedIn: boolean;
  currentUser?: User;
  currentUserSubscription?: Subscription;
}

export class UsersComponent extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      selection: 0,
      roleSelection: '',
      input: 0,
      signedIn: false
    };
  }

  changeSelection = (event) => {
    this.setState({
      selection: +event.target.value
    });
  }

  changeRoleSelection = (event) => {
    this.setState({
      roleSelection: event.target.value
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
      case 4: {
        if (isNaN(+this.state.roleSelection)) {
          const url = `http://localhost:8081/users/role/${this.state.roleSelection}`
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
    const currentUserSubscription = $currentUser.subscribe(async user => {
      if (user === null) {
        console.log("I have no user!");
        this.setState({
          currentUser: undefined,
          signedIn: false
        })
        return;
      } else {
        console.log("i have a user");
        if (user.role === 'Student') {
          await this.setState({
            currentUser: user,
            signedIn: true,
            selection: 1,
            input: user.userid
          });
        }
        else {
          await this.setState({
            currentUser: user,
            signedIn: true,
          });
        }
        this.changeList();
      }
    });
    this.setState({
      currentUserSubscription
    });
  }

  componentWillUnmount() {
    this.state.currentUserSubscription && this.state.currentUserSubscription.unsubscribe();
  }

  render() {
    return (
      <div>
        {this.state.signedIn && <div className="container">
          {(this.state.currentUser && (this.state.currentUser.role !== 'Student')) && <>
            {(this.state.selection > 0 && this.state.selection < 4) && <input className="form-contorl" onChange={this.changeUser} />}
            {this.state.selection === 4 && <select defaultValue={'Admin'} onChange={this.changeRoleSelection}>
              <option value={'Admin'}>Admin</option>
              <option value={'Teacher'}>Teacher</option>
              <option value={'Pro Hero'}>Pro Hero</option>
              <option value={'Student'}>Student</option>
            </select>}
            <select value={this.state.selection} onChange={this.changeSelection}>
              <option value={0}>All Users</option>
              <option value={1}>By ID</option>
              <option value={2}>By Name</option>
              <option value={3}>By Hero Name</option>
              <option value={4}>By Role</option>
            </select>
            <button className="btn btn-success" onClick={this.changeList}>Get Users</button>
            <div className="row">
              {this.state.users.map(user => (
                <UserCardComponent key={user.userid} user={user} />
              ))}
            </div>
          </>}
          {(this.state.currentUser && (this.state.currentUser.role === 'Student')) && <>0
              {
                <UserProfileComponent key={this.state.currentUser.userid} user={this.state.currentUser} />
              }
          </>}}
        </div>}
      </div>
    );
  }
}