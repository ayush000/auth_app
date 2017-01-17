import React from 'react';
import { initializeSdk, checkLoginState, getUserImage, getUserName, logOut } from './facebook';
import { browserHistory } from 'react-router';
export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
            userName: '',
        };
    }
    componentDidMount() {
        console.log('component was mounted');

        initializeSdk(() => {
            // eslint-disable-next-line no-undef
            console.log(FB);
            console.log('initializeSdk');
            // eslint-disable-next-line no-undef            
            FB.AppEvents.logPageView();
            checkLoginState((err, response) => {
                if (err) {
                    console.log(err);
                    browserHistory.push('/');
                } else {
                    console.log('connected');
                    const user_id = response.authResponse.userID;
                    getUserImage(user_id, (err, imgUrl) => {
                        if (err) return console.log(err);
                        this.setState({ imgUrl: imgUrl });
                    });
                    getUserName((err, userName) => {
                        if (err) return console.log(err);
                        this.setState({ userName: userName });
                    });
                }
            });
        });

    }

    handleButtonClick = () => {
        logOut();
        browserHistory.push('/');
    }
    render() {
        console.log(this.state.imgUrl);
        return (
            <div>
                <button classID="logOut" onClick={this.handleButtonClick}>Log out</button>
                <h2>{this.state.userName}</h2>
                <img src={this.state.imgUrl} alt="Profile" />
            </div>
        );
    }
}
