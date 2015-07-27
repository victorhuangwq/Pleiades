// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var introguide = introJs();

  introguide.setOptions({
    steps: [
        {
          intro: '<center>HowToGo is all about QuikMaps.</center>\
        <hr/>Use the <b>arrow keys</b> for navigation or hit <b>ESC</b> to exit the tour immediately.'
        },
        {
          //element:"#compass",
          intro: "QuikMaps are simplified maps that gets the direction across to your guests and friends"
        },
        {
          element:"#myNavbar",
          intro: "Search for an existing QuikMap to your destination, else Create a new one!"
        },
        {
          element: "#searchbutton",
          intro: "Click on <strong>search</strong> to search existing QuikMaps",
        },
        {
          element: "#createbutton",
          intro: "Now let's dive into how to create a QuikMaps"
        }
    ],
    doneLabel: 'Create QuikMap',
    //tooltipPosition: 'auto',
    //positionPrecedence: ['bottom','left', 'right', 'top']
  });

  introguide.oncomplete(function(){
    window.location.href = '/create/create?introTrue=true';
  });

  $('#tour').click(function(){
    //introJs().setOptions('doneLabel','Next page');
    introguide.start();
    $('#myNavbar').collapse('false');
  });

});
