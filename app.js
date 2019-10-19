var config = {
  apiKey: "AIzaSyCyUYb5pzFf_g2mWBAFdxUU6LYT66avu64",
  authDomain: "train-finder-1edef.firebaseapp.com",
  databaseURL: "https://train-finder-1edef.firebaseio.com",
  projectId: "train-finder-1edef",
  storageBucket: "train-finder-1edef.appspot.com",
  messagingSenderId: "1070804563329",
  appId: "1:1070804563329:web:2c7e84670bedc0faa46480"
};



//Initialize Firebase
firebase.initializeApp(config);


//A variable to reference the database.
var database = firebase.database();

//ON-CLICK & VARIABLES
var name;
var destination;
var firstTrain;
var frequency = 0;

$('#add-train').on("click", function () {
  event.preventDefault();
  // Storing and retreiving new train data
  name = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();

  //Pushing to database
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $("form")[0].reset();
});

database.ref().on("child_added", function (childSnapshot) {
  var nextArr;
  var minAway;

  var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm");

  var maxMoment = moment.max(moment(), firstTrainNew);

  var diffTime = moment().diff(moment(firstTrainNew), "minutes");
  var remainder = diffTime % childSnapshot.val().frequency;

  minAway = childSnapshot.val().frequency - remainder;
  var nextTrain;

  if (maxMoment === firstTrainNew) {
    nextTrain = firstTrainNew.format("hh:mm A");
    minAway = firstTrainNew.diff(moment(), "minutes");
  } else {
    nextTrain = moment().add(minAway, "minutes").format("hh:mm");
  }


  //ADD ROW
  $("#add-row").append("<tr><td>" + childSnapshot.val().name +
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + nextTrain +
    "</td><td>" + minAway + "</td></tr>");


}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//   $("#name-display").html(snapshot.val().name);
//   $("#email-display").html(snapshot.val().email);
//   $("#age-display").html(snapshot.val().age);
//   $("#comment-display").html(snapshot.val().comment);
// });