import React from 'react';
import { Subscription } from 'rxjs';
import { $currentUser, updateCurrentUser } from '../streams/user-stream';
import User from '../classes/users';

interface IState {
    currentUser?: User;
    currentUserSubscription?: Subscription;
    signedIn: boolean;
}

export class SignOutComponent extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            signedIn: false
        }
        this.signout = this.signout.bind(this);
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
                this.setState({
                    currentUser: user,
                    signedIn: true
                })
            }
        });
        this.setState({
            currentUserSubscription
        });
    }

    componentWillUnmount() {
        this.state.currentUserSubscription && this.state.currentUserSubscription.unsubscribe();
    }

    async signout() {
        await fetch('http://localhost:8081/logout', { method: 'POST', credentials: 'include' });
        updateCurrentUser(null);
    }

    render() {
        return (
            <form className="form-signin">
               {this.state.signedIn && <div>
               <h1 className="h3 mb-3 font-weight-normal">Are you sure you want to sign out?</h1>
                <button className="btn btn-lg btn-danger btn-block" onClick={this.signout}>Sign Out</button>
                </div>}
            </form>
        );
    }
}