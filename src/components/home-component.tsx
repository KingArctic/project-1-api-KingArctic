import React from "react";
import { Slideshow } from "./slideshow-component";


export class HomeComponent extends React.Component<any> {
    render() {
        return (
            <div id="carousel-container">
                <h1>Welcome To UA High School!</h1>
                <br></br>
                {Slideshow()}
            </div>
        )
    }
}