$(document).ready(function(){


function actualTime(){
	var actualTime = moment().utcOffset(240).format('HH:mm');
	return (actualTime);
}

function actualMinutesTime(){
	var actualMinutes=actualTime().slice(3,5);
	return(parseInt(actualMinutes));
}

function timeToUnix(){


//continue here



}

var config = {
	apiKey: "AIzaSyBIXwuFkVitzP-3jhkHEtcAGK7l3-h4zuk",
	authDomain: "fir-time-3d1bf.firebaseapp.com",
  databaseURL: "https://fir-time-3d1bf.firebaseio.com",
  projectId: "fir-time-3d1bf",
  storageBucket: "fir-time-3d1bf.appspot.com",
  messagingSenderId: "1095060467631"
};

firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
$("#add-train-btn").on("click", function(event) {
// Don't refresh the page!
	event.preventDefault();

	// Storing the values on click
	var nameInput=$("#name-input").val().trim();
	var destinationInput=$("#destination-input").val().trim();
	var frequencyInput=parseInt($("#frequency-input").val().trim());
  var firstTrainTimeInput=($("#firstTrainTime-input").val()).trim();
  //var minutesAwayInput=$("#minutesAway-input").val().trim();

  //Sending data to firebase!
  database.ref().push({
	  name: nameInput,
	  destination: destinationInput,
	  frequency: frequencyInput,
	  firstTrainTime: firstTrainTimeInput
	  //, minutesAway: minutesAwayInput
  });

  
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
	console.log(snapshot.val());
  console.log(snapshot);
  var sv = snapshot.val();

	var nameValue = (sv.name);
	var destinationValue = (sv.destination);
	var frequencyValue = (sv.frequency);
	var firstTrainTimeValue = (sv.firstTrainTime);
	//var minutesAwayValue = (sv.minutesAway);
	console.log(nameValue,destinationValue,frequencyValue,firstTrainTimeValue);
	

	function nextTrain(time){
 		var minutes= parseInt(time.slice(3,5));

		if (minutes<actualMinutesTime()) {
			var math=actualMinutesTime()-minutes;
			var difference= frequencyValue-math;
			var remaining=frequencyValue+difference;
			var arrivalTime=actualMinutesTime()+remaining;

	}
	console.log(remaining)
	return(arrivalTime);
}

	nextTrain(firstTrainTimeValue);

	var tableString="<tr><td>"+nameValue+"</td><td>"+destinationValue+"</td><td>"+frequencyValue+ "</td></tr>";
	$("#train-schedule").prepend(tableString);

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});



// function convertTime(time){
// 	var timeToMinutes=(time.slice(0,2))
// 	console.log(timeToMinutes)
// }
// convertTime("11:35")
/*
Moment.js

First time: 9am
convert to unix

Current time: 11.35
conver to unix

Diff = (current time - first time)
convert difference in unix to minutes

remainingMinutes=  dif modulo frequency

arrival time=current time + remaining 

Arrival= current + remaining



*/