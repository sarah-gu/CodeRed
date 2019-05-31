abrvs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


// for(i = 0; i < 50; i++){
//     stateSVG = document.getElementById(abrvs[i]);
//     stateSVG.onclick = getFacts
// }


function popitup(url) {
	newwindow=window.open(url,'name','height=250,width=450');
	if (window.focus) {newwindow.focus()}
	return false;
}


function getFacts(){
    console.log("id: " + this.id);
}


// var state = abrvs[Math.floor(Math.random() * 50)]; 
// var stateSVG = document.getElementById(state);
// used.push(state);

// //if the user selects the correct state
// function correct(){
//     score+=1;
//     if(high_score < score)
//         high_score = score;
//     stateSVG.style.fill = '#7aef80';
//     console.log(stateSVG.fill);
//     stateSVG.onclick = incorrect;
//     state = abrvs[Math.floor(Math.random() * 50)];
//     while(used.includes(state) === true)
//         state = abrvs[Math.floor(Math.random() * 50)];
//     used.push(state)
//     stateSVG = document.getElementById(state);
//     document.getElementById('state').innerHTML=state;
    
//     //tells the score report that user got it
//     $.ajax({
//                 url: "scorereport",                      
//                 type: "get",                         
//                 data:  "type=correct&state="+state,
//                 success: function(response) {
//                     console.log("worked!")
//                 },
//                 error: function (stat, err) {
//                     r = document.getElementById("table");
//                     r.innerHTML = 'something went wrong in the kitchen!';
//                 }       
//             });
// }

// //tells the score report that the user skipped a state
// function skipped(){
//     $.ajax({
//                 url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
//                 type: "get",                         // use a 'get' type request
//                 data:  "type=skipped&state="+state, //serialize form and pass to server
//                 success: function(response) {
//                     console.log("worked!")
//                 },
//                 error: function (stat, err) {
//                     r = document.getElementById("table");
//                     r.innerHTML = 'something went wrong in the kitchen!';
//                 }       
//             });
//             stateSVG.onclick = incorrect;
//             state = abrvs[Math.floor(Math.random() * 50)]; 
//             stateSVG = document.getElementById(state);
//             document.getElementById('state').innerHTML=state;
// }

// //tells the score report that the user clicked the wrong state
// function incorrect(){
//     console.log("type=incorrect&state="+state+"clicked="+this.id);
//     $.ajax({
//                 url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
//                 type: "get",                         // use a 'get' type request
//                 data:  "type=incorrect&state="+state+"&clicked="+this.id, //serialize form and pass to server
//                 success: function(response) {
//                     console.log("worked!")
//                 },
//                 error: function (stat, err) {
//                     r = document.getElementById("table");
//                     r.innerHTML = 'something went wrong in the kitchen!';
//                 }       
//             });
// }

// //starts the timer
// function startTimer() {
//     score = 0;
//     console.log("started timer");
//     document.getElementById('state').innerHTML=state;
//     var time = 1000
//     document.getElementById('strt').disabled= true;
//     document.getElementById('skp').disabled= false;
//     document.getElementById('stp').disabled= false;
//     downloadTimer = setInterval(function(){ 
//         if (currTime == 0){
//             stop();
//         }
//         stateSVG.onclick = correct;
//         for(i = 0; i < 50; i++){
//             if(abrvs[i] == state)
//                 continue;
//             otherState = document.getElementById(abrvs[i]);
//             otherState.onclick = incorrect;
//         }
//         //console.log("HERE")
//         //console.log(stateSVG)
//         //console.log(state)
//         scoreholder.innerHTML = 'Score: ' + score;
//         highscoreholder.innerHTML = 'High Score: ' + high_score;
//         timer.innerHTML = currTime/1000 +' seconds';
//         console.log(currTime);
//         currTime = currTime-time;

//     }, time);
    
//     //tells score report to reset
//     $.ajax({
//                 url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
//                 type: "get",                         // use a 'get' type request
//                 data:  "type=reset", //serialize form and pass to server
//                 success: function(response) {
//                     console.log("worked!")
//                 },
//                 error: function (stat, err) {
//                     r = document.getElementById("table");
//                     r.innerHTML = 'something went wrong in the kitchen!';
//                 }       
//             });
    
// }

// //updates the page when time is up
// function stop(){
//     state = abrvs[Math.floor(Math.random() * 50)]; 
//     timer.innerHTML = "Time's Up!"
//     stateSVG = document.getElementById(state);
//     document.getElementById('state').innerHTML='';
//     clearInterval(downloadTimer)
//     currTime = 45000
//     document.getElementById('stp').disabled= true;
//     document.getElementById('strt').disabled= false;
//     document.getElementById('skp').disabled= true;
//     abrvs.forEach(function(a){
// 	var a = document.getElementById(a)
// 	a.style.fill = "darkgrey";
// 	a.onclick=undefined;
// 	});
// }