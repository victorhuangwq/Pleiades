// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

var tour = new Tour({
  steps:[
    {
      element: "#myNavBar",
      title:"NavBar",
      content:"Use the navigation bar to navigate around the website!"
    }
  ]
});

tour.init();

$('#tour').click( function() {
    tour.start();
});

});
