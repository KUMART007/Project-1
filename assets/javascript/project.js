// weatherbitAPIKey = a9e56460888847cb8e5be3983a349760;
// weatherbitUrl = "https://api.weatherbit.io/v2.0/current?"
// example call for Api https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY


// eventfulAPIKey = gS6C4DppGrbXnzJ8;
//Example query for Eventful API http://api.eventful.com/json/events/search?...&where=32.746682,-117.162741&within=25

var locationZIP = "";
var withinDistance = "";

$("#submit").on("click", function(){
    event.preventDefault();
    locationZIP = $("#postalCode").val().trim();
    withinDistance = $("#milesSelect").val();
    console.log(locationZIP);
    console.log(withinDistance);

    //weatherbit API call
$.ajax({
    url: "https://api.weatherbit.io/v2.0/current?key=a9e56460888847cb8e5be3983a349760&postal_code=" + 
    locationZIP + "&country=US",
    method: "GET"
})

.then(function (WbResponse) {
    
    var WbResults = WbResponse.data;
});

//eventful API call
$.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=gS6C4DppGrbXnzJ8&date=today&total_items=10&location="+
     locationZIP +"&within=" 
     + withinDistance,
    method: "GET",
}).then(function(eResponse){
    var eResults = JSON.parse(eResponse)
    
         console.log(eResults.events.event[1].title);
    });
});