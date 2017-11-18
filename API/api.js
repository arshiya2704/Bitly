
const shorturlapi = 'http://bitlylb-638645599.us-west-1.elb.amazonaws.com';
const trendapi = "http://bitly-trend-359192198.us-west-1.elb.amazonaws.com:3000";
var fetch = require('node-fetch');
const headers = {
    'Accept': 'application/json'
};

const shortUrl = (payload) =>
fetch(`${shorturlapi}/encodeUrl`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res.status);
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

const findTrending = () =>
    fetch(`${trendapi}/trendingUrl`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }

    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


exports.shortUrl=shortUrl;
exports.findTrending =findTrending;
