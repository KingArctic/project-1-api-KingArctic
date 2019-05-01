import React from 'react';
import StudentRequest from '../../classes/request';

interface IRequestCardProps {
    request: StudentRequest;
}


interface IState {
    update: boolean;
    
}

export class RequestCardComponent extends React.PureComponent<IRequestCardProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            update: true
        };
        console.log(this.state.update);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }
    toggle() {
        let test2 = this.state.update;
        this.setState({
            update: !test2
        })
        console.log(this.state.update);
    }

    async update() {
        const resp = await fetch('http://localhost:8081/requests', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(this.props.request),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(resp);

        let test2 = this.state.update;
        this.setState({
            update: !test2
        })
    }
    updateAuthorFirst = (event) => {
        this.props.request.authorfirst = event.target.value
    }
    updateAuthorLast = (event) => {
        this.props.request.authorlast = event.target.value
    }
    updateStatus = (event) => {
        this.props.request.status = event.target.value
    }
    updateType = (event) => {
        this.props.request.type = event.target.value
    }
    updateDescription = (event) => {
        this.props.request.description = event.target.value
    }
    
    render() {
        const request = this.props.request;
        return (
            <div key={'request-' + request.requestid} className="card col-md-4 col-sm-6 col-xs-12">
            <br></br>
                <img src={request.imageurl}
                    className="card-img-top"
                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{request.requestid}</h5>
                </div>
                {this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item">Author: {request.authorfirst + ' ' + request.authorlast}</li>
                    <li className="list-group-item">Status: {request.status}</li>
                    <li className="list-group-item">Type: {request.type}</li>
                    <li className="list-group-item">Description: {request.description}</li>
                    <li className="list-group-item">Resolver: {(request.resolverfirst ? request.resolverfirst : '') + ' ' + (request.resolverlast ? request.resolverlast : '')}</li> 
                    <li className="list-group-item">
                    <button className="btn btn-danger" onClick={this.toggle}>Update</button>
                    </li>
                </ul>}
                {!this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="First Name" defaultValue={request.authorfirst} onChange={this.updateAuthorFirst}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Last Name" defaultValue={request.authorlast} onChange={this.updateAuthorLast}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Status" defaultValue={request.status} onChange={this.updateStatus}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Type" defaultValue={request.type} onChange={this.updateType}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Description" defaultValue={request.description} onChange={this.updateDescription}></input></li>
                    <li className="list-group-item">
                    <button className="btn btn-danger" onClick={this.update}>Update</button>
                    </li>
                </ul>}
            </div>
        )
    }
}