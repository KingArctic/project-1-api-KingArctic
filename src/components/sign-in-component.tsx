import React from 'react';
import { Subscription } from 'rxjs';
import User from '../classes/users';
import { updateCurrentUser, $currentUser } from '../streams/user-stream';

interface ISignInState {
  username: string;
  password: string;
  errorMessage: string;
  signedIn: boolean;
  currentUser ?: User;
  currentUserSubscription ?: Subscription;
}

export class SignInComponent extends React.Component<any, ISignInState> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      signedIn: false
    };
    this.setSignedIn = this.setSignedIn.bind(this);
  }

  submit = async (event) => {
    event.preventDefault();
    console.log('attempting to login');
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    try {
      const resp = await fetch('http://localhost:8081/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(credentials),
        headers: {
          'content-type': 'application/json'
        }
      })
      const body = await resp.json();
      console.log(resp);

      if (resp.status === 401) {
        this.setState({
          errorMessage: 'Invalid Credentials'
        });
      } else if (resp.status === 200) {
        this.setSignedIn(true);
        updateCurrentUser(body);
        this.props.history.push('/home');
      } else {
        this.setState({
          errorMessage: 'Cannot Login At This Time'
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  updateUsername = async (event) => {
    await this.setState({
      username: event.target.value
    });
  }

  updatePassword = async (event) => {
    await this.setState({
      password: event.target.value
    });
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

  async setSignedIn(bool: boolean) {
    await this.setState({
      signedIn: true
    });
  }

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div>
        {!this.state.signedIn && <form className="form-signin" onSubmit={this.submit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text" id="inputUsername" name="username"
            className="form-control" placeholder="Username"
            required value={username} onChange={this.updateUsername} />

          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password"
            className="form-control" placeholder="Password"
            required value={password} onChange={this.updatePassword} />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p id="login-error">{errorMessage}</p>
        </form>}
      </div>
    );
  }
}