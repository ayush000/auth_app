import React from 'react';
import { initializeSdk, checkLoginState } from './facebook';
import { browserHistory } from 'react-router';
export default class extends React.Component {
    componentDidMount() {
        // Loading sdk
        initializeSdk(() => {
            checkLoginState((isLoggedIn) => {
                if (isLoggedIn) {
                    console.log('connected');
                } else {
                    browserHistory.push('/');
                }
            });
        });
    }
    render() {
        return (
            <div>Home</div>
        );
    }
}
