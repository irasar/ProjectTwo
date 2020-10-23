$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $(".languageBtn").on("click", function(event) {
    event.preventDefault();
    // get the actual language from the data type
    const lang = $(this).data("language");
    console.log(lang);
    //hit the server with the language specified
    $.get("/api/members/" + lang).then((data) => {
      console.log(data);
    });
  });
});
// $(".create-job").on("click", function(event) {
//   event.preventDefault();

//   // Make a job object
//   var Newjob = {
//     jobName: $("#jobName").val().trim(),
//     price: $("#price").val().trim(),
//     languages: $("#languages").val().trim(),
//     jobDone: $("#jobDone").val(),

//   };

//   console.log(Newjob);

//   // Send an AJAX POST-request with jQuery
//   $.post("/api/new", Newjob)
//     // On success, run the following code
//     .then(function() {

//       var row = $("<div>");
//       row.addClass("job");

//       row.append("<p>" + Newjob.jobName + " job: </p>");
//       row.append("<p>" + Newjob.price + "</p>");
//       row.append("<p>" + Newjob.languages + "</p>");
//       row.append("<p>" + Newjob.jobDone + "</p>");

//       $("#job-area").prepend(row);

//     });

//   // Empty each input box by replacing the value with an empty string
//   $("#jobName").val("");
//   $("#price").val("");
//   $("#languages").val();
//   $("#jobDone").val()
// });

// on click function for the css button
// get request from jobs database
// use the id of languages
