import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FirstComponent } from './components/first-component';
import { SecondComponent } from './components/second-component';
import { ThirdComponent } from './components/third-component';

const App: React.FC = () => {
  return (
    <div className="App">
    <FirstComponent />
      My Application
      <SecondComponent />
      <ThirdComponent />
    </div>
  );
}

export default App;
