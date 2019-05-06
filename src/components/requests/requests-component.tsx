import React from 'react';
import StudentRequest from '../../classes/request';
import { RequestCardComponent } from './request-card-component';
import { AddRequestCardComponent } from './request-add-card-component';
import User from '../../classes/users';
import { Subscription } from 'rxjs';
import { $currentUser } from '../../streams/user-stream';


interface IState {
  requests: StudentRequest[];
  selection: number;
  input: any;
  signedIn: boolean;
  currentUser?: User;
  currentUserSubscription?: Subscription;
}

export class RequestsComponent extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      requests: [],
      selection: 0,
      input: 0,
      signedIn: false
    };
  }

  changeSelection = async (event) => {
    await this.setState({
      selection: +event.target.value
    });
  }

  changeInput = async (event) => {
    await this.setState({
      input: event.target.value
    });
    console.log(this.state.input);
  }

  changeList = async () => {
    switch (this.state.selection) {
      case 0: {
        const resp = await fetch('http://localhost:8081/requests', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
        })
        break;
      }
      case 1: {
        if (isNaN(+this.state.input)) {
          const url = `http://localhost:8081/requests/author/name/${this.state.input}`
          const resp = await fetch(url, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          await this.setState({
            requests: body
          })
        }
        break;
      }
      case 2: {
        const url = `http://localhost:8081/requests/author/id/${this.state.input}`
        const resp = await fetch(url, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
        })
        break;
      }
      case 3: {
        console.log('reached here ' + this.state.input + ' ' + this.state.selection);
        if (isNaN(+this.state.input)) {
          const resp = await fetch(`http://localhost:8081/requests/status/type/${this.state.input}`, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          await this.setState({
            requests: body
          })
        }
        break;
      }
      case 4: {
        const resp = await fetch(`http://localhost:8081/requests/status/id/${this.state.input}`, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
        })
        break;
      }
      case 5: {
        const resp = await fetch(`http://localhost:8081/requests/author/id/${this.state.currentUser && this.state.currentUser.userid}`, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
        })
        break;
      }
      case 6: {
        const resp = await fetch(`http://localhost:8081/requests/author/id/${this.state.currentUser && this.state.currentUser.userid}/status/${this.state.input}`, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
        })
        break;
      }
      default: {
        const resp = await fetch('http://localhost:8081/requests', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        await this.setState({
          requests: body
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
            selection: 5,
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
    let userRole;
    if (this.state.currentUser && this.state.currentUser) {
      userRole = this.state.currentUser.role;
    }
    return (
      <div>
        {this.state.signedIn && <div className="container">
          {(this.state.selection === 1 || this.state.selection === 2) && <input className="form-contorl" onChange={this.changeInput} />}
          {(this.state.selection === 3 || this.state.selection === 6) && <select defaultValue={'PENDING'} onChange={this.changeInput}>
            <option value={'PENDING'}>Pending</option>
            <option value={'APPROVED'}>Approved</option>
            <option value={'DENIED'}>Denied</option>
            <option value={'REQUIRES MORE INFO'}>Requires More Info</option>
          </select>}
          {this.state.selection === 4 && <select defaultValue={'1'} onChange={this.changeInput}>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
            <option value={'4'}>4</option>
          </select>}
          <select value={this.state.selection} onChange={this.changeSelection}>
            {(this.state.currentUser && (this.state.currentUser.role !== 'Student')) && <>
              <option value={0}>All Request</option>
              <option value={2}>By Author ID</option>
              <option value={1}>By Author Name</option>
              <option value={4}>By Status ID</option>
              <option value={3}>By Status Type</option>
            </>}
            {(this.state.currentUser && (this.state.currentUser.role === 'Student')) && <>
              <option value={5}>All Request</option>
              <option value={6}>By Status Type</option>
            </>}
          </select>
          <button className="btn btn-success" onClick={this.changeList}>Get Requests</button>
          <div className="row">
            {this.state.requests.map(request => (
              <RequestCardComponent key={request.requestid} request={request} role={userRole} />
            ))}
            <AddRequestCardComponent />
          </div>
        </div>}
      </div>
    );
  }
}