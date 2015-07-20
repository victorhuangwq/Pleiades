// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var introguide = introJs();

  introguide.setOptions({
    steps: [
        {
          element: '#myNavbar',
          intro: 'This guided tour will explain the Hongkiat demo page interface.<br><br>Use the arrow keys for navigation or hit ESC to exit the tour immediately.',
          position: 'bottom'
        }
    ]
  });

  introguide.start();
});
