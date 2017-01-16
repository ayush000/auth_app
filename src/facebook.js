function initializeSdk(callback) {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));

    // sdk callback function
    window.fbAsyncInit = () => {
        // eslint-disable-next-line no-undef
        FB.init({
            appId: '355696044788303',
            xfbml: true,
            version: 'v2.8',
        });
        
        // eslint-disable-next-line no-undef
        console.log('calling checkLoginState');
        callback();
    };
}

function checkLoginState(callback) {
    // eslint-disable-next-line no-undef
    FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
            return callback(true);
        }
        callback(false);
    });
}
export { initializeSdk, checkLoginState };

