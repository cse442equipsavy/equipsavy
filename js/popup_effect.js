$(document).ready(function(){
 $("#select").click(function(){
  showpopup();
 });
    $("#edit").click(function(){
  showpopup();
 });
 $("#no_button").click(function(){
  hidepopup();
 });
 $("#yes_button").click(function(){
  hidepopup();
 });
     $("#cancel_button").click(function(){
  hidepopup();
});
});


function showpopup()
{
 $("#popup_box").fadeToggle();
 $("#popup_box").css({"visibility":"visible","display":"block"});
}

function hidepopup()
{
 $("#popup_box").fadeToggle();
 $("#popup_box").css({"visibility":"hidden","display":"none"});
}