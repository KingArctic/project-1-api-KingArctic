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
    this.changeList();
  }

  render() {
    return (
      <div className="container">
        {(this.state.selection === 1 || this.state.selection === 2) && <input className="form-contorl" onChange={this.changeInput} />}
        {this.state.selection === 3 && <select defaultValue={'PENDING'} onChange={this.changeInput}>
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
          <div key={0} className="card col-md-4 col-sm-6 col-xs-12">
            <br></br>
            <div className="card-body">
              <button className="btn btn-info btn-lg">Add New Request</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}