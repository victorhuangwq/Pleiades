// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var introguide = introJs();

  introguide.setOptions({
    steps: [
        {
          intro: 'HowToGo is all about QuikMaps.'
        },
        {
          element:"#compass",
          intro: "QuikMaps are simplified maps that gets the direction across to your guests and friends"
        },
        {
          element:"#myNavbar",
          intro: "Search for an existing QuikMap to your destination, else Create a new one!"
        },
        {
          element: "#createButton",
          intro: "Search is pretty intuitive. Let's dive into straight into how to create those QuikMaps"
        }
    ],
    doneLabel: 'Create QuikMap',
    tooltipPosition: 'auto',
    positionPrecedence: ['left', 'right', 'bottom', 'top']
  });

  introguide.oncomplete(function(){
    window.location.href = '/create/create?introTrue=true';
  });

  $('#tour').click(function(){
    //introJs().setOptions('doneLabel','Next page');
    introguide.start();
  });

});
