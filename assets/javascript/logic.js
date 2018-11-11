var config = {
    apiKey: "AIzaSyCZQrzLerJqPwgYl9h4sM9H6nD6DCaV73A",
    authDomain: "train-scheduler-9731a.firebaseapp.com",
    databaseURL: "https://train-scheduler-9731a.firebaseio.com",
    projectId: "train-scheduler-9731a",
    storageBucket: "train-scheduler-9731a.appspot.com",
    messagingSenderId: "869494458342"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

   // var name = "";
   // var destination = "";
   //var frequency = 0;
    //let time = "";
   // let minutes = 0;
   // let arrival = "";
   //let minutes = 0;
   //let arrival = "";

   

  $( "#submitBtn" ).click(function() {
    event.preventDefault();

    var name = $("#nameInput").val().trim();
    var  destination = $("#destinationInput").val().trim();
    var time = $("#timeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    database.ref("/trains").push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    //dateAdded:Firebase.ServerValue.TIMESTAMP
    });
   
  });




    database.ref("/trains").on("child_added", function(snapshot) {

       event.preventDefault();

        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().frequency);
        console.log(snapshot.val().time);
        
        let timeDiff = moment().diff(moment(snapshot.val().time, "minutes"));
        let remainder = timeDiff % (snapshot.val().frequency);
     //math for minutes left and arrival time
        minutes = (snapshot.val().frequency) - remainder;
        arrival = moment().add(minutes, "m").format("hh:mm A");
        
        console.log(moment());

    var newRow = $("<tr>");
    var newName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newArrival = $("<td>");
    var newMinutesAway= $("<td>");


    newName.text(snapshot.val().name);
    newDestination.text(snapshot.val().destination);
    //newTime.text(childSnapshot.val().time);
    newFrequency.text(snapshot.val().frequency);
    newArrival.text(arrival);
    newMinutesAway.text(minutes);
 
    newRow.append(newName, newDestination, newFrequency, newArrival, newMinutesAway);
    $("#tBody").append(newRow);

   

    console.log("timeDiff:  " + timeDiff);
        console.log("remainder:  " + remainder);
        console.log("minutes:  " + minutes);
        console.log("arrival:  " + arrival);
      // Handle the errors
    },function(errorObject) {
        console.log("Errors handled: " + errorObject.code);


     });
