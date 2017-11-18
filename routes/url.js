
var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var alert = require('alert-node');
var API =require('../API/api');

router.post('/', function(req, resp, next) {
    var url = req.param("url");

    if(url == ""){
        console.log("Hey I am null");
        alert("Please enter a url");
        //alert("Empty url");
    }

    
    else{
            if(url.match("ppiper.hopto.org/\*")){

                API.findTrending()
                .then((result) => {
                    if (result.status === 200) {
                        result.json().then(trend => {
                            console.log(trend);
                            ejs.renderFile("./views/index.ejs",{"url":url,"trenddata":trend},function (err,result) {
                                if(!err){
                                    resp.end(result);
                                }
                            })
                        });
                    }
                    ;
                });
                
                alert("It's already a ppiper link");
            }
            else{
                API.shortUrl({"url":url})
                .then((res) => {
                if (res.status === 200) {
                    res.json().then(data => {
                        console.log("data is: "+data.message);
        
                        API.findTrending()
                        .then((result) => {
                            if (result.status === 200) {
                                result.json().then(trend => {
                                    console.log(trend);
                                    ejs.renderFile("./views/index.ejs",{"url":url,"shortUrl":data.message,"trenddata":trend},function (err,result) {
                                        if(!err){
                                            resp.end(result);
                                        }
                                    })
                                });
                            }
                            ;
                        });
                    });
                }
            });
            }
            
    }

    



    //resp.redirect('/');
});


module.exports = router;



/*function short(req,res) {
    console.log(req.param("url"));
    var url = req.param("url");
    var data = querystring.stringify({
        url : url
    });

    var options = {
        host: '192.168.43.5',
        port: 3001,
        path: '/encodeUrl',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        var resdata;
        response.on('data', function (chunk) {
            console.log("body: " + chunk.message);
            resdata=chunk;

        });
        response.on('end', function() {
            console.log("got this: " + resdata.message);
            ejs.renderFile("./views/index.ejs",{"shortUrl":resdata.message},function (err,result) {
                if(!err){
                    res.end(result);
                }
            })
        })
    });
    httpreq.write(data);
    httpreq.end();

}*/
