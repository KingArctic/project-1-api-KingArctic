import React from 'react';
import User from '../../classes/users';
import UserPackage from '../../classes/user-package';

interface IUserCardProps {
    user: User;
}

interface IState {
    update: boolean;
    roleSelection: number;
    userPackage: UserPackage;
}

export class UserCardComponent extends React.Component<IUserCardProps, IState> {
    constructor(props: any) {
        super(props);
        let tempRole = 0;
        switch (this.props.user.role) {
            case 'Admin':
                tempRole = 1;
                break;
            case 'Teacher':
                tempRole = 2;
                break;
            case 'Pro Hero':
                tempRole = 3;
                break;
            case 'Student':
                tempRole = 4;
                break;
            default:
                tempRole = 0;
                break;
        }

        this.state = {
            update: true,
            roleSelection: tempRole,
            userPackage: new UserPackage(this.props.user.userid, this.props.user.heroname, this.props.user.password, this.props.user.firstname, this.props.user.lastname, this.props.user.email, tempRole, this.props.user.imageurl)
        };
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    async toggle() {
        let test2 = this.state.update;
        await this.setState({
            update: !test2
        })
    }

    async update() {
        console.log(this.state.userPackage);
        const resp = await fetch('http://localhost:8081/users', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(this.state.userPackage),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(resp);

        let test2 = this.state.update;
        await this.setState({
            update: !test2
        })
    }

    changeSelection = async (event) => {
        await this.setState({
            roleSelection: parseFloat(event.target.value)
        });
        this.updateRole();
    }

    updateFirstName = (event) => {
        this.setState({
            userPackage: {
                ...this.state.userPackage,
                firstname: event.target.value
            }
        });
    }
    updateLastName = (event) => {
        this.setState({
            userPackage: {
                ...this.state.userPackage,
                lastname: event.target.value
            }
        });
    }
    updateHeroName = (event) => {
        this.setState({
            userPackage: {
                ...this.state.userPackage,
                heroname: event.target.value
            }
        });
    }
    updateEmail = (event) => {
        this.setState({
            userPackage: {
                ...this.state.userPackage,
                email: event.target.value
            }
        });
    }
    updateRole() {
        switch (this.state.roleSelection) {
            case 1:
                this.setState({
                    userPackage: {
                        ...this.state.userPackage,
                        roleid: this.state.roleSelection
                    }
                });
                break;
            case 2:
                this.setState({
                    userPackage: {
                        ...this.state.userPackage,
                        roleid: this.state.roleSelection
                    }
                });
                break;
            case 3:
                this.setState({
                    userPackage: {
                        ...this.state.userPackage,
                        roleid: this.state.roleSelection
                    }
                });
                break;
            case 4:
                this.setState({
                    userPackage: {
                        ...this.state.userPackage,
                        roleid: this.state.roleSelection
                    }
                });
                break;
            default:
                this.setState({
                    userPackage: {
                        ...this.state.userPackage,
                        roleid: 0
                    }
                });
                break;
        }
    }

    render() {
        const user = this.state.userPackage;
        let tempRole = '';
        switch (this.state.userPackage.roleid) {
            case 1:
                tempRole = 'Admin';
                break;
            case 2:
                tempRole = 'Teacher';
                break;
            case 3:
                tempRole = 'Pro Hero';
                break;
            case 4:
                tempRole = 'Student';
                break;
            default:
                tempRole = 'No Role';
                break;
        }
        return (
            <div key={'user-' + user.userid} className="card col-md-4 col-sm-6 col-xs-12">
                <img src={user.imageurl}
                    className="card-img-top card-background"
                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{user.heroname}</h5>
                </div>
                {this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item">Full Name: {user.firstname + ' ' + user.lastname}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Role: {tempRole}</li>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.toggle}>Update</button>
                    </li>
                </ul>}
                {!this.state.update && <ul className="list-group list-group-flush">
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Hero Name" defaultValue={user.heroname} onChange={this.updateHeroName}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="First Name" defaultValue={user.firstname} onChange={this.updateFirstName}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Last Name" defaultValue={user.lastname} onChange={this.updateLastName}></input></li>
                    <li className="list-group-item"><input className="form-control" type="text" placeholder="Email" defaultValue={user.email} onChange={this.updateEmail}></input></li>
                    <select className="form-control" value={this.state.roleSelection} onChange={this.changeSelection}>
                        <option value={1}>Admin</option>
                        <option value={2}>Teacher</option>
                        <option value={3}>Pro Hero</option>
                        <option value={4}>Student</option>
                    </select>
                    <li className="list-group-item">
                        <button className="btn btn-danger" onClick={this.update}>Update</button>
                    </li>
                </ul>}
            </div>
        )
    }
}