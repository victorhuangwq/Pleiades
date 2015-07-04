$(document).ready(function() {

  //Copy and pasting code
  var copy_link_button = $('#copyLinkButton');
  copy_link_button.disabled = !document.queryCommandSupported('copy');

  copy_link_button.click(function(){
    var copy_text_area = $('#copyLinkArea');
    copy_text_area.select();

    try{
      var successful = document.execCommand('copy');
      console.log('Copying text was ' +successful);
    }
    catch(err){
      console.log(err);
    }
  });

});
