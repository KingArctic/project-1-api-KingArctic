import React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/mha.png';
import User from '../../classes/users';
import { Subscription } from 'rxjs';
import { $currentUser } from '../../streams/user-stream';

interface IState {
  signedIn: boolean;
  currentUser?: User;
  currentUserSubscription?: Subscription;
}

export class NavComponent extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      signedIn: false
    };
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

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            {!this.state.signedIn && <div>
              <li className="nav-item active">
                <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
              </li>
            </div>}
            {this.state.signedIn && <>
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/users" className="unset-anchor nav-link">Users</Link>
            </li>
            <li className="nav-item active">
              <Link to="/requests" className="unset-anchor nav-link">Requests</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-out" className="unset-anchor nav-link">Sign Out</Link>
            </li> </>}
          </ul>
        </div>
      </nav>
    );
  }
}