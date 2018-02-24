$(document).ready(function(){

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
  });
 
});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

	var remaining;
	var diff;
	var minutesAway;

	console.log(snapshot.val());
  	var sv = snapshot.val();

	var nameValue = (sv.name);
	var destinationValue = (sv.destination);
	var frequencyValue = (sv.frequency);
	var firstTrainTimeValue = (sv.firstTrainTime);
	
	function difference(){			//returns the difference between the actual time and the first rain time
		diff=moment().diff(moment(firstTrainTimeValue,"HH:mm A"),"m");
		return(diff);
	}

	var modulo=difference()%frequencyValue; //We use modulo to calculate how much later the user arrived since the last train
	var nextTrain=frequencyValue-modulo; //the difference will be how long is the wait for the next train
	var arrivalTime=moment().add(nextTrain, "minuntes"); //Calculating the arrival time
	arrivalTime=moment(arrivalTime).format("hh:mm A");	

  //Prepending everything       
	var tableString="<tr><td>"+nameValue+"</td><td>"+destinationValue+"</td><td>"+ "Train every: "+frequencyValue+"</td><td>"+arrivalTime+ "</td><td>"+nextTrain+" minutes</td></tr>";
	$("#train-schedule").prepend(tableString);

	var actualTime=moment().format("MM/DD/YYYY hh:mm A");
	$("#actualTime").text("Last Time Updated: " + actualTime);

    }, function(errorObsject) {
      console.log("Errors handled: " + errorObject.code);
    });

});