// const { DELETE } = require("sequelize/types/lib/query-types");

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
  //ensure connection as a User
  console.log("hooked up");
  //When you click a button this function will read the language and append
  $(".languageBtn").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked");
    // get the actual language from the data type
    const lang = $(this).data("language");
    console.log(lang);
    //hit the server with the language specified
    $.get("/api/members/" + lang).then((data) => {
      console.log(data);
      $("#results").empty();

      //build dynamic card with all the data and append each card to the correct div
      for (let i = 0; i < data.length; i++) {
        var div = $("<div class='card'>");
        var divC = $("<div class='card-content'>");
        var span = $("<span class='card-title'>");
        var pTag = $("<p>");
        var pTagTwo = $("<p>");
        var pTagThree = $("<p>");
        var description = "Description: ";
        var contact = `<form method="get" action="/contactus">
        <button style='color: black;' type="submit">Contact Us</button>
    </form>`;
        var finish = $(
          "<button class='finish'> Finish Job </button>"
        ).attr("id", data[i].id);
        var del = $("<button class='del '> Delete Job </button>").attr(
          "id",
          data[i].id
        );
        var jobName = "Job: " + data[i].jobName;
        var price = "Price: $" + data[i].price;
        var language = "language: " + data[i].language;
        div.append(divC);
        divC.append(span);
        span.text(jobName);
        divC.append(pTag);
        divC.append(pTagTwo);
        divC.append(pTagThree);
        divC.append(contact);
        divC.append(del);
        divC.append(finish);
        pTag.text(price);
        pTagTwo.text(language);
        pTagThree.text(description);
        $("#results").append(div);
      }
      // Destroy function that deletes the specific job from the Jobs table
      $(".del").on("click", function(event) {
        event.preventDefault();
        console.log("button clicked");
        var jobid = this.id;
        console.log(jobid);

        //DELETE restful method on the specific job id
        $.ajax({
          url: "/delete/jobs/" + jobid,
          method: "DELETE",
        }).then(function(req, res, err) {
          if (err) throw err;
          window.location.reload();
        });
      });
      //update function to finish job
      $(".finish").on("click", function(event) {
        event.preventDefault();
        console.log("finish clicked");
        var jobid = this.id;
        console.log(jobid);

        $.ajax({
          url: "/update/jobs/" + jobid,
          method: "PUT",
        }).then(function(req, res, err) {
          if (err) throw err;
          window.location.reload();
        });
      });
    });
  });
});
