/* globals localStorage */
/* globals sessionStorage */
const VueResource = require('vue-resource');
const api = require('./api');

module.exports = {
    apiUrl: "/v1/auth",
    //todo: intercept 403/401

    login (login, pass, permanent, cb) {
        if (this.loggedIn()) {
            this.resetToken();
        }

        Vue.http.post(api.getEndpointUrl() + this.apiUrl, {
            email_or_name: login,
            password: pass
        }).then(function(response) {
            //todo: check success flag? validation errors?
            console.log(response);
            var token = response.data.payload.token;
            var type = response.data.payload.user_type;
            
            sessionStorage.token = token;
            sessionStorage.user = login;
            // this temporary code
            type = 'agent'; 
            if (login == 'admin') {
                type = 'admin';
            }
            //
            sessionStorage.type = type;
            if (permanent) {
                localStorage.token = token;
                localStorage.type = type;
            }
            if (cb) cb(true, type);
        }, function(error) {
            console.log(error);
            if (cb) cb(false, null, error.data.error.message);
        });
    },

    getToken () {
        return sessionStorage.token || localStorage.token;
    },

    getType () {
        return sessionStorage.type || localStorage.type;
    },

    resetToken() {
        delete sessionStorage.token;
        delete localStorage.token;
        delete sessionStorage.user;
        delete sessionStorage.type;
        delete localStorage.type;
    },

    logout (cb) {
        this.resetToken();
        if (cb) cb();
    },

    loggedIn () {
        return !!this.getToken();
    },

    getloggedInUser () {
        return sessionStorage.user;
    }
};