// weatherbitAPIKey = a9e56460888847cb8e5be3983a349760;
// weatherbitUrl = "https://api.weatherbit.io/v2.0/current?"
// example call for Api https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY


// eventfulAPIKey = gS6C4DppGrbXnzJ8;
//Example query for Eventful API http://api.eventful.com/json/events/search?...&where=32.746682,-117.162741&within=25

var locationZIP = "";
var withinDistance = "";
$(".lds-ripple").hide();


$("#submit").on("click", function(){
    event.preventDefault();
    locationZIP = $("#postalCode").val().trim();
    withinDistance = $("#milesSelect").val();
    $(".lds-ripple").show();
    console.log(locationZIP);
    console.log(withinDistance);

    //weatherbit API call
$.ajax({
    url: "https://api.weatherbit.io/v2.0/current?key=a9e56460888847cb8e5be3983a349760&postal_code=" + 
    locationZIP + "&country=US&units=I",
    method: "GET"
})

.then(function (WbResponse) {
    var WbResults = WbResponse.data[0];

    $("#actualTempResult").text("Actual Temperature: " + WbResults.temp + String.fromCharCode(176));
    $("#tempResult").text("How it Feels: " + WbResults.app_temp + String.fromCharCode(176));
    $("#cityResult").text("in " + WbResults.city_name);
    console.log(WbResults);

});

//eventful API call
$.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=gS6C4DppGrbXnzJ8&date=today&total_items=10&(q=arts||concerts||festivals)&location="+
     locationZIP +"&within=" 
     + withinDistance,
    method: "GET"

}).then(function(eResponse){

    var eResults = JSON.parse(eResponse);

    for (var i = 0; i < 10; i++) {
        var newDiv = $("<div>");
        var eventURL = eResults.events.event[i].url
        newDiv.addClass("individual-event-container");   
        $("#eventful-items").append(newDiv);
        newDiv.append("<p class=event-name>Event: " + eResults.events.event[i].title + "</p>");
        newDiv.append("<p>Location: " + eResults.events.event[i].venue_name + " at " + eResults.events.event[i].venue_address);
        newDiv.append("<p>Start date/time (if provided): " + eResults.events.event[i].start_time + "</p>");
        newDiv.append("<p>For more info: " + "<a href='" + eventURL + "' target='blank'>Event Website</a>" + "</p>");
        $(".lds-ripple").hide(); 
        console.log(eResults);
             console.log(eventURL)
    }

    $("#surpriseButton").on("click", function() {
        event.preventDefault();
    
        var randomItem = eResults.events.event[Math.floor(Math.random()*eResults.events.event.length)];
        var surpriseURL = randomItem.url
        console.log(surpriseURL)

        var newSurpriseDiv = $("<div>")
        $("#surprisePick").append(newSurpriseDiv);
        newSurpriseDiv.addClass("surprise-event-container");
        newSurpriseDiv.append("<p class=event-name>Event picked for you: " + randomItem.title + "</p>");
        newSurpriseDiv.append("<p>Location: " + randomItem.venue_name + " at " + randomItem.venue_address);
        newSurpriseDiv.append("<p>Start date/time (if provided): " + randomItem.start_time + "</p>");
        newSurpriseDiv.append("<p>For more info: " + "<a href='" + surpriseURL  + "' target='blank'>Event Website</a>" + "</p>");
        $("#eventful-items").empty();

});


});

});   