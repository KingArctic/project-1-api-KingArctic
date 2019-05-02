import React from 'react';
import './include/bootstrap';
import './App.css';
import { BrowserRouter, Route, /* Switch */ } from 'react-router-dom';
import { NavComponent } from './components/nav/nav-component';
import { HomeComponent } from './components/home-component';
import { SignInComponent } from './components/sign-in-component';
import { UsersComponent } from './components/users/user-component';
import { RequestsComponent } from './components/requests/requests-component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent />
        <div id="main-content-container">
          <Route path="/home" component={HomeComponent} />
          <Route path="/sign-in" component={SignInComponent} />
          <Route path="/users" component={UsersComponent} />
          <Route path="/requests" component={RequestsComponent} />
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
