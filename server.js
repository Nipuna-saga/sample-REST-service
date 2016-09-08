var config = require('./config.json')
var express = require("express")

var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

initGet = function() {//this function  initialize all REST GET services

    var getRequests = config.getRequests;

    console.log(getRequests)

    getRequests.forEach(function(getRequest) {

        app.get(getRequest.path, function(req, res) {
            res.send(getRequest.payload)
        })
    })

}

initPost = function() {//this function  initialize all REST POST services

    var postRequests = config.postRequests;

    console.log(postRequests)

    postRequests.forEach(function(postRequest) {

        app.post(postRequest.path, function(req, res) {

            var response = req.body;
            response.payload = postRequest.payload;
            console.log(response)
            res.send(response)
        })
    })

}

init = function() {//This function initalize all RESt services
    initGet();
    initPost();
}

init();

var server = app.listen(8085, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("server is  listening at http://%s:%s", host, port)

})