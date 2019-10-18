var weatherbitAPIKey = a9e56460888847cb8e5be3983a349760;
var weatherbitUrl = "https://api.weatherbit.io/v2.0/current?"
//combining key and url together
// note: API key is last in the url add inbetween url and key for queries
var queryWbURL = weatherbitAPIKey + weatherbitAPIKey;
// example call for Api https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY

var eventfulAPIKey = gS6C4DppGrbXnzJ8;
var queryEURL = "http://api.eventful.com/rest/events/search?"

//Example query for Eventful API http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741&within=25

//weatherbit API call
$.ajax({
    url: queryWbURL,
    method: "GET"
})

    .then(function (WbResults) {

        var WbResults = WbResults.data;
    });

//eventful API call
$.ajax({
    url: queryEURL,
    method: "GET"
})

    .then(function (eResponse) {

        var EResults = eResponse.data;
    });