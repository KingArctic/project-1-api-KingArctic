import React from "react";
import { Slideshow } from "./slideshow-component";
import User from "../classes/users";
import { Subscription } from "rxjs";
import { $currentUser } from "../streams/user-stream";

interface IState {
    signedIn: boolean;
    currentUser?: User;
    currentUserSubscription?: Subscription;
}

export class HomeComponent extends React.Component<any, IState> {
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
            <div>
                {this.state.signedIn && <div id="carousel-container">
                    <h1>Welcome To UA High School!</h1>
                    <br></br>
                    {Slideshow()}
                </div>}
            </div>
        );
    }
}