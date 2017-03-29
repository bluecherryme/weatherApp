$(function() {
  /* GET JSON LONGITUDE AND LATITUDE BY IP ADDRESS */
  var APIKey = 'c5a1f0f3f48be4935f522b1aed3b2274';
    
  if (navigator.geolocation) {
    /*GET WEATHER DATA*/ 
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude; 
      var lon = position.coords.longitude;
      var URL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIKey; console.log(URL);
      $.getJSON(URL, function(weather) {
        $("#city").html(weather.name);
        $("#description").html(weather.weather[0].description);
        var tempF = Math.round(weather.main.temp * 9 / 5 - 459.67);
        var tempC = Math.round((tempF - 32) * 5 / 9);

        /*ON CLICK SWITCH BETWEEN F AND C*/
        $("#temp").html(tempC + '&degC');
        var isCel = true;
        $("#temp").click(function() {
          if (isCel) {
            $("#temp").html(tempF + '&degF');
            isCel = false;
          } else {
            $("#temp").html(tempC + '&degC');
            isCel = true;
          }
        });
        /*GET WEATHER ICON*/
        var icon = weather.weather[0].icon;
        $('#icon').attr("src", "http://openweathermap.org/img/w/" + icon + ".png");

        var bgimage;

        switch (icon) {
            /*Thunderstorm*/
          case "11d":
            bgimage = '/pics/thunder.jpg';
            break;
            /*Rain*/
          case "09d":
          case '10d':
            bgimage ='/pics/rain.jpg';
            break;
            /*Snow*/
          case "13d":
            bgimage = '/pics/snow.jpg';
            break;
            /*Clear Sky*/
          case "01d":
          case '01n':
            bgimage ='/pics/Clearsky.jpg';
            break;
            /*cloudy*/
          case "02d":
          case "02n":
          case "03d":
          case "03n":
          case '04d':
          case '04n':
            bgimage = '/pics/cloudy.jpg';
            break;
            /*Mist*/
          case "50d":
          case '50n':
            bgimage = '/pics/misty.jpg';
            break;
        }
        $('body').css('background-image', 'url("' + bgimage + '")')
        
      });
    });
  } 
  else {
    alert("Geolocation is not available!"); 
  }
});
