abrvs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

questions = {"AL": "Which state had the second highest gun violence rates in 2018?", "AK": "Which state is ranked number one in gun violence?", "AZ": "Which of the following states does not require a background check to buy a gun: AZ, CA, MA?", "AR": "What state ranks 7th in gun deaths?", "CA": "In what state was the San Bernadino attack?", "CO": "In what state was the Columbine HS massacre?", "CT": "Where was the largest elementary school shooting to date?", 
    "DE": "In what state was the DSU shooting?", "FL": "Where was the shooting at Pulse, the gay nightclub?", "GA": "In what state are you twice as likely to be shot than in NY?", "HI": "Which state is ranked 49th in gun violence rates?", "ID": "Which state had 0 mass shootings between 1982 and 2018: VA, ID, CA?", "IL": "Which state had the least shootings: AL, LA, IL?", "IN": "Which state is in the list of 20 states with the most gun violence: IN, MA, RI?", "IA": "Which state has the lowest rate of gun violence: NM, MT, IA?",
    "KS": "Which state does not require a permit to carry a handgun: KS, SD, UT?", "KY": "Which state has the most gun violence: AZ, KY, TN?", "LA": "Which state has the third highest rate of gun violence?", "ME": "Which state allows citizens to carry concealed weapons without a permit: AL, ME, NV?", "MD": "For which state is the regulation of guns considered permissive: CA, NJ, MD?", "MA": "Which state has the least gun violence?", "MI": "Which of these states has the least gun violence: TX, MI, VA?", "MN": "Which of these states has the most gun violence: MN, HI, NY?",
    "MS": "Which state has the 4th higest rate of gun violence?", "MO": "Which state allows citizens to carry a weapon without a permit: MO, NC, VT?", "MT": "Which of these states is in the top 10 for highest gun violence rates: MA, RI, MT?", "NE": "Which of these states has the least gun violence: NE, CA, GA?", "NV": "Where was the most deadly shooting in the US to date?", "NH": "Which state does not require citizens to carry a permit for concealed weapons: NH, VA, HI?", "NJ": "What is the second hardest state to buy a gun in?", "NM": "Which state is in the top 10 for highest rates of gun violence: NM, MA, RI?",
    "NY": "Which state is in the list of 5 states with the lowest gun violence: CA, GA, NY?", "ND": "Which state has the least gun violence: ND, VA, TX?", "NC": "Which state has the most gun violence: NC, DE, NH?", "OH": "In what state did the Pike County Rhoden shootings occur?", "OK": "In what state did two armed bystanders at a restaurant apprehend a shooter?", "OR": "Which state has the most gun violence: OR, RI, MA?", "PA": "Where was the largest synagogue shooting in 2018?", "RI": "Which state has the second to least gun violence?",
    "SC": "Which state is in the top 10 for highest rates of gun violence: RI, NY, SC?", "SD": "Which state has the least gun violence: CO, SD, NC?", "TN": "Which state has the most gun violence: TN, GA, ID?", "TX": "In what state was the largest church shooting to date?", "UT": "Which state has the least gun violence: UT, NC, ID?", "VT": "Which state is one of the five states with the lowest gun violence: VT, NY, GA?", "VA": "Where was the most deadly university shooting in the US to date?", "WA": "Which state has the most gun violence: WA, ME, CA?",
    "WV": "Which state has the most gun violence: WV, NY, CA?", "WI": "Which state has the most gun violence: WI, GA, IL?", "WY": "Which state has the most gun violence: NY, WY, ID?" 
}
timer = document.getElementById('timer_holder');
scoreholder = document.getElementById('score');
highscoreholder = document.getElementById('high_score');

var currTime = 45000

var score = 0;
var high_score = 0;

used = []

var state = abrvs[Math.floor(Math.random() * 50)]; 
var stateSVG = document.getElementById(state);
used.push(state);

//if the user selects the correct state
function correct(){
    score+=1;
    if(high_score < score)
        high_score = score;
    stateSVG.style.fill = '#7aef80';
    console.log(stateSVG.fill);
    stateSVG.onclick = incorrect;
    state = abrvs[Math.floor(Math.random() * 50)];
    while(used.includes(state) === true)
        state = abrvs[Math.floor(Math.random() * 50)];
    used.push(state)
    console.log(used);
    stateSVG = document.getElementById(state);
    document.getElementById('state').innerHTML=questions[state];
    
    //tells the score report that user got it
    $.ajax({
                url: "scorereport",                      
                type: "get",                         
                data:  "type=correct&state="+state+"&question="+questions[state],
                success: function(response) {
                    console.log("worked!")
                },
                error: function (stat, err) {
                    console.log("broken")

                }       
            });
}

//tells the score report that the user skipped a state
function skipped(){
    $.ajax({
                url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
                type: "get",                         // use a 'get' type request
                data:  "type=skipped&state="+state+"&question="+questions[state], //serialize form and pass to server
                success: function(response) {
                    console.log("worked!")
                },
                error: function (stat, err) {
                    console.log("broken")
                }       
            });
            stateSVG.onclick = incorrect;
            state = abrvs[Math.floor(Math.random() * 50)]; 
            while(used.includes(state) === true)
                state = abrvs[Math.floor(Math.random() * 50)];
            used.push(state)
            stateSVG = document.getElementById(state);
            document.getElementById('state').innerHTML=questions[state];
}

//tells the score report that the user clicked the wrong state
function incorrect(){
    console.log("type=incorrect&state="+state+"clicked="+this.id+"&question="+questions[state]);
    $.ajax({
                url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
                type: "get",                         // use a 'get' type request
                data:  "type=incorrect&state="+state+"&clicked="+this.id, //serialize form and pass to server
                success: function(response) {
                    console.log("worked!")
                },
                error: function (stat, err) {
                    console.log("broken")
                }       
            });
}

//starts the timer
function startTimer() {
    score = 0;
    console.log("started timer");
    document.getElementById('state').innerHTML=questions[state];
    console.log(questions[state])
    var time = 1000
    document.getElementById('strt').disabled= true;
    document.getElementById('skp').disabled= false;
    document.getElementById('stp').disabled= false;
    downloadTimer = setInterval(function(){ 
        if (currTime == 0){
            stop();
        }
        stateSVG.onclick = correct;
        for(i = 0; i < 50; i++){
            if(abrvs[i] == state)
                continue;
            otherState = document.getElementById(abrvs[i]);
            otherState.onclick = incorrect;
        }
        //console.log("HERE")
        //console.log(stateSVG)
        //console.log(state)
        scoreholder.innerHTML = 'Score: ' + score;
        highscoreholder.innerHTML = 'High Score: ' + high_score;
        timer.innerHTML = currTime/1000 +' seconds';
        console.log(currTime);
        currTime = currTime-time;

    }, time);
    
    //tells score report to reset
    $.ajax({
                url: "scorereport",                      // goes to https://user.tjhsst.edu/pckosek/kitchen
                type: "get",                         // use a 'get' type request
                data:  "type=reset", //serialize form and pass to server
                success: function(response) {
                    console.log("worked!")
                },
                error: function (stat, err) {
                    console.log("broken")

                }       
            });
    
}

//updates the page when time is up
function stop(){
    state = abrvs[Math.floor(Math.random() * 50)]; 
    timer.innerHTML = "Time's Up!"
    stateSVG = document.getElementById(state);
    document.getElementById('state').innerHTML='';
    clearInterval(downloadTimer)
    currTime = 45000
    document.getElementById('stp').disabled= true;
    document.getElementById('strt').disabled= false;
    document.getElementById('skp').disabled= true;
    abrvs.forEach(function(a){
	var a = document.getElementById(a)
	a.style.fill = "darkgrey";
	a.onclick=undefined;
	});
}