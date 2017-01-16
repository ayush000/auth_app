import React from 'react';
import { initializeSdk, checkLoginState } from './facebook';
import { browserHistory } from 'react-router';
import './Login.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'Not logged in',
    };
  }

  // testApi = () => {
  //   console.log('Welcome!  Fetching your information.... ');
  //   // eslint-disable-next-line no-undef
  //   FB.api('/me', (response) => {
  //     console.log(response);
  //     console.log('Successful login for: ' + response.name);
  //     this.setState({
  //       status: 'Thanks for logging in, ' + response.name + '!',
  //     });
  //   });
  // }

  // // This is called with the results from from FB.getLoginStatus().
  // handleStatusChange = (response) => {
  //   if (response.status === 'connected') {
  //     browserHistory.push('/home');
  //     // Logged into your app and Facebook.
  //     // this.testApi();
  //   } else {
  //     // The person is not logged into Facebook, so we're not sure if
  //     // they are logged into this app or not.
  //     this.setState({
  //       status: 'Please log ' +
  //       'into Facebook.',
  //     });
  //   }
  // }

  // componentDidMount() {
  //   // Loading sdk
  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = '//connect.facebook.net/en_US/sdk.js';
  //     fjs.parentNode.insertBefore(js, fjs);
  //   } (document, 'script', 'facebook-jssdk'));

  //   // sdk callback function
  //   window.fbAsyncInit = () => {
  //     // eslint-disable-next-line no-undef
  //     FB.init({
  //       appId: '355696044788303',
  //       xfbml: true,
  //       version: 'v2.8',
  //     });
  //     // eslint-disable-next-line no-undef
  //     FB.AppEvents.logPageView();
  //     // eslint-disable-next-line no-undef
  //     console.log('calling checkLoginState');
  //     this.checkLoginState();
  //   };
  // }

  // checkLoginState = function () {
  //   // eslint-disable-next-line no-undef
  //   FB.getLoginStatus((response) => {
  //     this.handleStatusChange(response);
  //   });
  // }

  componentDidMount() {
    initializeSdk(() => {
      // eslint-disable-next-line no-undef
      FB.AppEvents.logPageView();
      checkLoginState((isLoggedIn) => {
        if (isLoggedIn) {
          browserHistory.push('/home');
        } else {
          console.log('not connected');
        }
      });
    });
  }

  handleClick = () => {
    // eslint-disable-next-line no-undef
    FB.login(this.checkLoginState());
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
