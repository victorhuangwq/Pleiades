// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
    $('#creatediv1').hide();
    $('#creatediv2').hide();
    $('#creatediv3').hide();
    $('#creatediv4').hide();

    $('#createbutton1').click( function() {
        $('#createbutton1').attr("disabled", true);
        $('#createbutton2').attr("disabled", false);
        $('#createbutton3').attr("disabled", false);
        $('#createbutton4').attr("disabled", false);
        $('#creatediv1').show();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });

    $('#createbutton2').click( function() {
        $('#createbutton1').attr("disabled", false);
        $('#createbutton2').attr("disabled", true);
        $('#createbutton3').attr("disabled", false);
        $('#createbutton4').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').show();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });

    $('#createbutton3').click( function() {
        $('#createbutton1').attr("disabled", false);
        $('#createbutton2').attr("disabled", false);
        $('#createbutton3').attr("disabled", true);
        $('#createbutton4').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').show();
        $('#creatediv4').hide();
    });

    $('#createbutton4').click( function() {
        $('#createbutton1').attr("disabled", false);
        $('#createbutton2').attr("disabled", false);
        $('#createbutton3').attr("disabled", false);
        $('#createbutton4').attr("disabled", true);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').show();
    });

    $('#createbutton5').click( function() {
        $('#createbutton1').attr("disabled", false);
        $('#createbutton2').attr("disabled", false);
        $('#createbutton3').attr("disabled", false);
        $('#createbutton4').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });

    $('#createbutton6').click( function() {
        $('#createbutton1').attr("disabled", false);
        $('#createbutton2').attr("disabled", false);
        $('#createbutton3').attr("disabled", false);
        $('#createbutton4').attr("disabled", false);
        $('#creatediv1').hide();
        $('#creatediv2').hide();
        $('#creatediv3').hide();
        $('#creatediv4').hide();
    });
});