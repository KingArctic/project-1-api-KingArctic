import React from 'react';
import User from '../../classes/users';

interface IUserCardProps {
    user: User;
}

interface IState {
    update: boolean;
}

export class UserCardComponent extends React.Component<IUserCardProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            update: true
        };
        console.log(this.state.update);
        this.testfunc = this.testfunc.bind(this);
        this.testfunc2 = this.testfunc2.bind(this);
    }

    testfunc() {
        let test2 = this.state.update;
        this.setState({
            update: !test2
        })
        console.log(this.state.update);
    }

    testfunc2() {
        let test2 = this.state.update;
        this.setState({
            update: !test2
        })
        console.log(this.state.update);
    }
    updateFirstName = (event) => {
        this.props.user.firstname = event.target.value
    }
    updateLastName = (event) => {
        this.props.user.lastname = event.target.value
    }
    updateHeroName = (event) => {
        this.props.user.heroname = event.target.value
    }
    updateEmail = (event) => {
        this.props.user.email = event.target.value
    }


    render() {
        const user = this.props.user;
        return (
            <div key={'user-' + user.userid} className="card col-md-4 col-sm-6 col-xs-12">
                <img src={user.imageurl}
                    className="card-img-top"
                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{user.heroname}</h5>
                </div>
                {this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item">Full Name: {user.firstname + ' ' + user.lastname}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Role: {user.role}</li>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.testfunc}>Update</button>
                    </li>
                </ul>}
                {!this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item">Hero Name: <input type="text" defaultValue={user.heroname} onChange={this.updateHeroName}></input></li>
                    <li className="list-group-item">First Name: <input type="text" defaultValue={user.firstname} onChange={this.updateFirstName}></input></li>
                    <li className="list-group-item">Last Name:  <input type="text" defaultValue={user.lastname} onChange={this.updateLastName}></input></li>
                    <li className="list-group-item">Email: <input type="text" defaultValue={user.email} onChange={this.updateEmail}></input></li>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.testfunc2}>Update</button>
                    </li>
                </ul>}
            </div>
        )
    }
}