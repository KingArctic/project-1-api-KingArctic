import React from 'react';
import StudentRequest from '../../classes/request';
import { RequestCardComponent } from './request-card-component';


interface IState {
  requests: StudentRequest[];
  selection: number;
  input: any;
}

export class RequestsComponent extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      requests: [],
      selection: 0,
      input: 0
    };
  }

  changeSelection = (event) => {
    this.setState({
      selection: +event.target.value
    });
  }

  changeInput = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  changeList = async () => {
    switch (this.state.selection) {
      case 0: {
        const resp = await fetch('http://localhost:8081/requests', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          requests: body
        })
        break;
      }
      case 1: {
        if (isNaN(+this.state.input)) {
          const url = `http://localhost:8081/requests/author/name/${this.state.input}`
          const resp = await fetch(url, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          this.setState({
            requests: body
          })
        }
        break;
      }
      case 2: {
        const url = `http://localhost:8081/requests/author/id/${this.state.input}`
        const resp = await fetch(url, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          requests: body
        })
        break;
      }
      case 3: {
        if (isNaN(+this.state.input)) {
          const resp = await fetch(`http://localhost:8081/requests/status/type/${this.state.input}`, { method: 'GET', credentials: 'include' });
          const body = await resp.json();
          this.setState({
            requests: body
          })
        }
        break;
      }
      case 4: {
        const resp = await fetch(`http://localhost:8081/requests/status/id/${this.state.input}`, { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          requests: body
        })
        break;
      }
      default: {
        const resp = await fetch('http://localhost:8081/requests', { method: 'GET', credentials: 'include' });
        const body = await resp.json();
        this.setState({
          requests: body
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
        <input className="form-contorl" onChange={this.changeInput} />
        <select value={this.state.selection} onChange={this.changeSelection}>
          <option value={0}>All Request</option>
          <option value={2}>By Author ID</option>
          <option value={1}>By Author Name</option>
          <option value={4}>By Status ID</option>
          <option value={3}>By Status Type</option>
        </select>
        <button className="btn btn-success" onClick={this.changeList}>Get Requests</button>
        <div className="row">
          {this.state.requests.map(request => (
            <RequestCardComponent key={request.requestid} request={request} />
          ))}
        </div>
      </div>
    );
  }
}