import React from 'react';
import StudentRequest from '../../classes/request';
import RequestPackage from '../../classes/request-package';

interface IRequestCardProps {
    request: StudentRequest;
}


interface IState {
    update: boolean;
    typeSelection: number;
    statusSelection: number;
    requestPackage: RequestPackage;
}

export class RequestCardComponent extends React.PureComponent<IRequestCardProps, IState> {
    constructor(props: any) {
        super(props);
        let tempType = this.returnTypeNumber(this.props.request.type);
        let tempStatus = this.returnStatusNumber(this.props.request.status);
        this.state = {
            update: true,
            typeSelection: tempType,
            statusSelection: tempStatus,
            requestPackage: new RequestPackage(this.props.request.requestid, this.props.request.authorid, this.props.request.datesubmitted, this.props.request.description, tempStatus, tempType, this.props.request.imageurl)
        };
        console.log(this.state.update);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }
    async toggle() {
        let test2 = this.state.update;
        await this.setState({
            update: !test2
        })
        console.log(this.state.update);
    }

    async update() {
        const resp = await fetch('http://localhost:8081/requests', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(this.state.requestPackage),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(resp);

        this.toggle();
    }
    updateStatus = async (event) => {
        await this.setState({
            statusSelection: event.target.value
        })
    }
    updateType = async (event) => {
        await this.setState({
            typeSelection: parseFloat(event.target.value)
        })
    }
    updateDescription = async (event) => {
        this.props.request.description = event.target.value
        await this.setState({
            requestPackage: {
                ...this.state.requestPackage,
                description: event.target.value
            }
        });
    }

    returnStatusNumber(status: string) {
        switch (status) {
            case 'PENDING':
                return 1;
            case 'APPROVED':
                return 2;
            case 'DENIED':
                return 3;
            case 'REQUIRES MORE INFO':
                return 4;
            default:
                return 0;
        }
    }

    returnStatusName(status: number) {
        switch (status) {
            case 1:
                return 'PENDING';
            case 2:
                return 'APPROVED';
            case 3:
                return 'DENIED';
            case 4:
                return 'REQUIRES MORE INFO';
            default:
                return 'No Status';
        }
    }

    returnTypeNumber(type: string) {
        switch (type) {
            case 'Hero Work':
                return 1;
            case 'Suit Request':
                return 2;
            case 'Suit Alterations':
                return 3;
            case 'Equipment Request':
                return 4;
            case 'Equipment Upgrades':
                return 5;
            case 'Suit/Equipment Repairs':
                return 6;
            case 'Extra Training':
                return 7;
            case 'Work Order':
                return 8;
            default:
                return 0;
        }
    }

    returnTypeName(type: number) {
        switch (type) {
            case 1:
                return 'Hero Work';
            case 2:
                return 'Suit Request';
            case 3:
                return 'Suit Alterations';
            case 4:
                return 'Equipment Request';
            case 5:
                return 'Equipment Upgrades';
            case 6:
                return 'Suit/Equipment Repairs';
            case 7:
                return 'Extra Training';
            case 8:
                return 'Work Order';
            default:
                return 'No Type'
        }
    }

    updateStatusAndType() {

    }

    render() {
        const requestState = this.state.requestPackage;
        const requestProp = this.props.request;
        const status = this.returnStatusName(requestState.status);
        const type = this.returnTypeName(requestState.type);
        return (
            <div key={'request-' + requestState.requestid} className="card col-md-4 col-sm-6 col-xs-12">
                <br></br>
                <img src={requestState.imageurl}
                    className="card-img-top"
                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{requestState.requestid}</h5>
                </div>
                {this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item">Author: {requestProp.authorfirst + ' ' + requestProp.authorlast}</li>
                    <li className="list-group-item">Description: {requestState.description}</li>
                    <li className="list-group-item">Type: {type}</li>
                    <li className="list-group-item">Status: {status}</li>
                    <li className="list-group-item">Resolver: {(requestProp.resolverfirst ? requestProp.resolverfirst : '') + ' ' + (requestProp.resolverlast ? requestProp.resolverlast : '')}</li>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.toggle}>Update</button>
                    </li>
                </ul>}
                {!this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Description" defaultValue={requestState.description} onChange={this.updateDescription}></input></li>
                    <select className="form-control" value={this.state.typeSelection} onChange={this.updateType}>
                        <option value={1}>Hero Work</option>
                        <option value={2}>Suit Request</option>
                        <option value={3}>Suit Alterations</option>
                        <option value={4}>Equipment Request</option>
                        <option value={5}>Equipment Upgrades</option>
                        <option value={6}>Suit/Equipment Repairs</option>
                        <option value={7}>Extra Training</option>
                        <option value={8}>Work Order</option>
                    </select>
                    <select className="form-control" value={this.state.statusSelection} onChange={this.updateStatus}>
                        <option value={1}>PENDING</option>
                        <option value={2}>APPROVED</option>
                        <option value={3}>DENIED</option>
                        <option value={4}>REQUIRES MORE INFO</option>
                    </select>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.update}>Update</button>
                    </li>
                </ul>}
            </div>
        )
    }
}