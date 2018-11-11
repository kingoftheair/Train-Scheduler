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

    var name = "";
    var destination = "";
   var frequency = 0;
    let time = "";
   // let minutes = 0;
   // let arrival = "";
   let minutes = 0;
   let arrival = "";

  

  $( "#submitBtn" ).click(function() {

    var tName = $("#nameInput").val().trim();
    var  tDestination = $("#destinationInput").val().trim();
    var tTime = $("#timeInput").val().trim();
    var tFrequency = $("#frequencyInput").val().trim();

    database.ref("/trains").push({
    name: tName,
    destination: tDestination,
    time: tTime,
    frequency: tFrequency,
    //dateAdded:Firebase.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(snapshot) {
})

    database.ref("/trains").on("child_added", function(snapshot) {

        let timeDiff = moment().diff(snapshot.val().tTime, "minutes");
        let remainder = timeDiff % (snapshot.val().frequency);
     //math for minutes left and arrival time
         minutes = (snapshot.val().frequency) - remainder
        arrival = moment().add(minutes, "m").format("hh:mm A");
        console.log(arrival);


    var newRow = $("<tr>");
    var newName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newArrival = $("<td>");
    var newMinutesAway = $("<td>");

    newName.text(snapshot.val().name);
    newDestination.text(snapshot.val().destination);
    //newTime.text(childSnapshot.val().time);
    newFrequency.text(snapshot.val().frequency);
    newArrival.text(arrival);
    newMinutesAway.text(minutes);
 
    newRow.append(newName, newDestination, newFrequency, arrival, newMinutesAway);
    $("#tBody").append(newRow);

});