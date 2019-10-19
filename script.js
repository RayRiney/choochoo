$(document).ready(function() { 

  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyDL1X55VuaZlY7nb6pdRw6wz4xvHSXywX0",
    authDomain: "trains-on-time-b779f.firebaseapp.com",
    databaseURL: "https://trains-on-time-b779f.firebaseio.com",
    projectId: "trains-on-time-b779f",
    storageBucket: "trains-on-time-b779f.appspot.com",
    messagingSenderId: "584171464340",
    appId: "1:584171464340:web:56eb4548a8c084f5f8f681",
    measurementId: "G-WQ6X0MW76N"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    $("#addTrain").on("click", function() {
  
     
      var trainName	= $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrainTime = $("#firstTrainTimeInput").val().trim();
      var frequency = $("#frequencyInput").val().trim();
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);
  
     
      var newTrain = {
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
      } 
  
      // Push to Firebase.
        database.ref().push(newTrain); 
  
      
    // Empty the form.
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
  
      return false;
    });  
  
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      var newTrain = childSnapshot.val();
      console.log("Previous Post ID: " + prevChildKey);
      var tFrequency = 15;
      var tFrequency = parseInt(newTrain.frequency);
      var firstTime = newTrain.firstTrainTime;
  
      
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
  
      var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm"));
       
      var timeDiff = moment().diff(moment.utc(firstTimeConverted), "minutes");
        console.log("Time difference: " + timeDiff);  
  
      
      var remainder = timeDiff % tFrequency;
        console.log(remainder);
  
      
      var tminutesTillTrain = tFrequency - remainder;
        console.log("Minutes Away: " + tminutesTillTrain); 
  
      
      var nextTrain = moment().add(tminutesTillTrain, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
  
        console.log(newTrain.destination);
  
    $("#trainSchedule").append("<tr><td>" + newTrain.name + "</td><td>" + newTrain.destination + "</td><td>" + newTrain.firstTrainTime + "</td><td>" + newTrain.frequency + "min </td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tminutesTillTrain + "min" + "</td></tr>");  
  
  });
  });  