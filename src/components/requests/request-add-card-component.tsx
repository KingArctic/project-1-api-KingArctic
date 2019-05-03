import React from 'react';
import RequestPackage from '../../classes/request-package';

interface IState {
    adding: boolean;
    typeSelection: number;
    requestPackage: RequestPackage;
}

export class AddRequestCardComponent extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            adding: false,
            typeSelection: 1,
            requestPackage: new RequestPackage(0, 0, new Date(), '', 1, 1, '')
        };

        this.toggleAdd = this.toggleAdd.bind(this);
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this)
    }

    async toggleAdd() {
        let test2 = this.state.adding;
        await this.setState({
            adding: !test2
        })
    }

    async add() {
        const resp = await fetch('http://localhost:8081/requests', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state.requestPackage),
            headers: {
                'content-type': 'application/json'
            }
        });

        console.log(resp);

        console.log(this.state.requestPackage);

        this.toggleAdd();
    }

    async cancel() {
        await this.setState({
            requestPackage: {
                ...this.state.requestPackage,
                type: 1,
                description: '',
            }
        });
        this.toggleAdd();
    }

    updateType = async (event) => {
        await this.setState({
            typeSelection: parseFloat(event.target.value),
            requestPackage: {
                ...this.state.requestPackage,
                type: parseFloat(event.target.value)
            }
        });
    }
    updateDescription = async (event) => {
        await this.setState({
            requestPackage: {
                ...this.state.requestPackage,
                description: event.target.value
            }
        });
    }

    render() {
        const requestState = this.state.requestPackage;
        return (
            <div key={0} className="card col-md-4 col-sm-6 col-xs-12">
                <div className="divider"></div>
                <div className="card-body">
                    <h5 className="card-title">New Request</h5>
                </div>
                <img src="https://pre00.deviantart.net/998c/th/pre/f/2018/117/4/e/_bnha_momo_x_male_reader__jealousy_by_elijahreyes-dc9ygjd.png"
                    className="card-img-top"
                    alt="..." />
                {!this.state.adding && <ul className="list-group list-group-flush">
                    <button className="btn btn-info btn-lg" onClick={this.toggleAdd}>Add New Request</button>
                </ul>}
                {this.state.adding && <ul className="list-group list-group-flush">
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
                    <li className="list-group-item">
                        <button className="btn btn-success" value={1} onClick={this.add}>Add</button>
                        <button className="btn btn-warning" value={1} onClick={this.cancel}>Cancel</button>
                    </li>
                </ul>}
                <div className="divider"></div>
            </div>
        )
    }
}