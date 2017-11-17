const api = 'http://192.168.43.5:3001';
var fetch = require('node-fetch');
const headers = {
    'Accept': 'application/json'
};

const shortUrl = (payload) =>
fetch(`${api}/encodeUrl`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


exports.shortUrl=shortUrl;