#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();
var path = require('path')

var hbs = require('hbs');
var request = require('request');

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/incident', express.static(path.join(__dirname, 'incident')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));




// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');


// -------------- variable definition  -------------- //
var renderDict = {report:[], score:0}
var statesInfo = {state:"", facts:[]}

// -------------- middleware -------------- //
function updateReport(req, res, next){
    if(req.query.type == "incorrect")
        renderDict.report.push("You incorrectly chose " + req.query.clicked + " instead of " + req.query.state);
    if(req.query.type == "skipped")
        renderDict.report.push("You skipped " + req.query.question + " The answer was " + req.query.state);
    if(req.query.type == "correct"){
        renderDict.report.push("You correctly identified " + req.query.state + " as the answer to " + req.query.question + "");
        renderDict.score += 1;
    }
    next();
}

function resetReport(req, res, next){
    if(req.query.type == "reset"){
        renderDict.report = [];
        renderDict.score = 0;
    }
    next();
}


// -------------- express endpoint definition -------------- //

app.get('/', function(req, res){
   res.sendFile(__dirname + "/index.html"); 
});

app.get('/map', function(req, res){
   res.sendFile(__dirname + "/map_index.html"); 
});

app.get('/checkaudio', function(req, res){
   res.sendFile(__dirname + "/check_index.html"); 
});

app.get('/findme', function(req, res){
   res.sendFile(__dirname + "/findme_index.html"); 
});

app.get('/game', function(req, res){
   res.sendFile(__dirname + "/game_index.html"); 
});

app.get('/scorereport', [updateReport, resetReport], function(req, res){
   res.render("hbs_index", renderDict); 
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});