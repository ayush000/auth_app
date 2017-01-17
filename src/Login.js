import React from 'react';
import { initializeSdk, checkLoginState, login } from './facebook';
import { browserHistory } from 'react-router';
import './Login.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'Not logged in',
    };
  }

  handleLogin = () => {
    checkLoginState((err, response) => {
      console.log('login state checked');
      if (err) {
        return console.log(err);
      } else {
        // console.log(response);
        // console.log('response');
        browserHistory.push('/home');
      }
    });
  }

  componentDidMount() {
    initializeSdk(() => {
      // console.log('initializeSdk login');
      this.handleLogin();
    });
  }

  handleClick = () => {

    login((err) => {
      if (err) console.log(err);
      this.handleLogin();
    });
  }
  render() {
    return (
      <div className="App">
        <a href="#" onClick={this.handleClick}>Login using facebook</a>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default App;
