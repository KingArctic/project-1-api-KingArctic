import React from 'react';
import StudentRequest from '../../classes/request';

interface IRequestCardProps {
    request: StudentRequest;
}

export class RequestCardComponent extends React.PureComponent<IRequestCardProps> {
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
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Author: {request.authorfirst + ' ' + request.authorlast}</li>
                    <li className="list-group-item">Status: {request.status}</li>
                    <li className="list-group-item">Type: {request.type}</li>
                    <li className="list-group-item">Description: {request.description}</li>
                    <li className="list-group-item">Resolver: {(request.resolverfirst ? request.resolverfirst : '') + ' ' + (request.resolverlast ? request.resolverlast : '')}</li> 
                    <li className="list-group-item">
                        <button className="btn btn-danger">Delete</button>
                    </li>
                </ul>
            </div>
        )
    }
}