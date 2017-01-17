function initializeSdk(callback) {
    console.log('reached here');
    (function (d, s, id) {
        console.log('anon function got called');
        var js, fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            console.log('if statement got called');
            return;
        }
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
        console.log('sdk was requested');
    } (document, 'script', 'facebook-jssdk'));
    console.log('still should get here');
    

    // sdk callback function
    window.fbAsyncInit = () => {
        console.log('sdk was loaded');
        // eslint-disable-next-line no-undef
        FB.init({
            appId: '355696044788303',
            xfbml: true,
            version: 'v2.8',
            cookie: true,
        });

        callback();
    };
}

function checkLoginState(callback) {
    // eslint-disable-next-line no-undef
    FB.getLoginStatus((response) => {
        console.log(response);
        if (response.status === 'connected') {
            return callback(null, response);
        }
        callback({ message: 'User not connected' });
    }, true);
}

function getUserImage(user_id, callback) {

    // eslint-disable-next-line no-undef
    FB.api(`${user_id}/picture?width=180&height=180`, (response) => {
        if (response && response.data && response.data.url) {
            return callback(null, response.data.url);
        }
        // console.log(response);
        callback({ message: 'No image found' });
    });
}

function getUserName(callback) {
    // eslint-disable-next-line no-undef
    FB.api('/me', function (response) {
        // console.log('Successful login for: ' + response.name);
        if (response && response.name) {
            return callback(null, response.name);
        }
        callback({ message: 'No such user found' });
    });
}

function logOut() {
    // eslint-disable-next-line no-undef
    FB.logout((response) => {
        // console.log(response);
    });
}

function login(callback) {
    // eslint-disable-next-line no-undef
    FB.login((response) => {
        // console.log('login response');
        // console.log(response);
        if (response && !response.error) {
            return callback(null, response);
        }
        callback({ message: 'Unable to log in' });
    });
}

export { initializeSdk, checkLoginState, getUserImage, getUserName, logOut, login };

