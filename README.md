#goEuropa's Bus Driver LCD Panel for KiedyBus/OneBusAway project

## LCD screen that assists the bus driver with information on route number, trip headsign, headway (if he's early or late) and upcoming stops.
## Information is taken from OneBusAway API.

#Hardware requirements
* Raspberry Pi 2/3
* Official LCD screen + official Rpi case
* Internet connection (WiFi, 3G,)
* Power converter to plug to bus 24V power

##Software Requirements
* Angular 1.x
* gruntjs
##Applicaton is generated using yeoman

Environment used "gruntjs". In order to run it locally, enter command "grunt serve". In order to compile project to production, enter command "grunt build --force". 
Next, copy content of "dist" folder to your webserver. Start and configure your Raspberry in Kiosk mode and autostart the prepared URL address. Configure the bus vehicle number using variable $scope.linia in main.js.

#Client application

Request to OBA API that the application generates, is based on existing key and agency id.
It is configured in angular application. Client application consist of main.js. API is called and through one-way-binding information on vehicle is displayed. 
URL to OBA API is also configured.

##Refresh function:

"$scope.odswiez" – works after each application refresh. q mechanism is in use, that synchronizes all requests to vehicle list and requests all available vehicle numbers.
Result is dispalyed after receiving all information. Next, interface is updated through onewaybinding.


"setInterval(function(){
      $scope.odswiez();
}, 3000);"

here, freqency of refresh is set to 3000 ms. Refresh function is also called in "main.html, using angular ng-click – ng-click="odswiez()" - this allows to include a button in UI to refresh application.
Directives ng-show and ng-hide in main.html, are responsible for loading bar and displaying current information on trip progress.
Layout is created using grid, using bootstrap framework - i.e independent on resulution of screen, two columns will be used for layout, which is responsible, using bootstrap framework.


##setting up the system
App is based on raspbian stretch, that needs to be setup on SD card (8gb or more).

##External systems
Applicaton uses:
* OneBusAway - https://github.com/OneBusAway.
* optionally also app can use TransitClock - https://github.com/TheTransitClock.
