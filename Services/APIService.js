var StorageService = require('StorageService');

var auth;

setTimeout(resetAuth, 500);

var BASE_URL = 'http://www.example.com/api/';

function onNetworkError(err) {
    console.log('NetworkError: ' + err);
}

function onAbnormalStatus(status) {
    console.log('Abnormal status: ' + status);
}

function _fetch(method, api, data) {
    var url = BASE_URL + api;
    if (method == 'GET' && data) {
        var parts = [];
        for (var key in data) {
            parts.push(key + '=' + encodeURIComponent(data[key]));
        }
        var query = '?' + parts.join('&');
        url += query;
    }
    var params = {
        method: method,
        headers: {}
    };
    if (auth) {
        params.headers['X-ACCESS-TOKEN'] = auth.token;
    }
    if (method == 'POST') {
        params.headers['Content-type'] = 'application/json';
        params.body = JSON.stringify(data);
    }
    return fetch(url, params)
        .catch(onNetworkError)
        .then(function(resp) {
            if (resp.ok) {
                return resp.json();
            } else {
                onAbnormalStatus(resp.status);
            }
        });
}

function resetAuth(clearAuth) {
    auth = clearAuth ? null : StorageService.get('auth');
}

module.exports = {
    get: function(api, data) {
        return _fetch('GET', api, data);
    },

    post: function(api, data) {
        return _fetch('POST', api, data);
    },

    resetAuth: resetAuth
};