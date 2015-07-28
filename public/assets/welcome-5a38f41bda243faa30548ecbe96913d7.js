// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var introguide = introJs();

  introguide.setOptions({
    steps: [
        {
          element:"#howtogo-title",
          intro: '<center>HowToGo is all about QuikMaps.</center>\
        <hr/>Use the <b>arrow keys</b> for navigation or hit <b>ESC</b> to exit the tour immediately.'
        },
        {
          //element:"#compass",
          intro: "<h4>What are QuikMaps</h4>QuikMaps are simplified maps that gets the direction across to your guests and friends"
        },
        {
          element:"#myNavbar",
          intro: "Either <b>Search</b> for an existing QuikMap to your destination, or <b>Create</b> one of your own!"
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
    disableInteraction: 'false'
  });

  introguide.oncomplete(function(){
    window.location.href = '/create/create?introTrue=true';
  });


  $('#tour').click(function(){
      if(window.innerWidth < 768){
        $('#myNavbar').collapse('show');
        $('#myNavbar').on('shown.bs.collapse',function(){
          introguide.start();
        });
      }
      else{
        introguide.start();
      }
  });

});
