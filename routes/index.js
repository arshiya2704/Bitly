var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var API =require('../API/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index.ejs' );
    API.findTrending()
        .then((result) => {
            if (result.status === 200) {
                result.json().then(data => {
                  console.log(data);
                    ejs.renderFile("./views/index.ejs",{"trenddata":data},function (err,result) {
                        if(!err){
                            res.end(result);
                        }
                    })
                });
            }
            ;
        });

});


module.exports = router;
