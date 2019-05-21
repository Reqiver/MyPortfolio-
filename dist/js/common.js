
// $(document).ready(function() {
//   function checkWidth() {
//     var windowWidth = $('body').innerWidth(),
//         elem = $("#slider"); // лучше сохранять объект в переменную, многократно чтобы не насиловать
//                                     // страницу для поиска нужного элемента
//     if(windowWidth < 480){
//       elem.removeClass('accordion');
//       elem.addClass('simple-slider');
//     }
//     else{
//       elem.removeClass('simple-slider');
//       elem.addClass('accordion');
//     }
//   }
//
//   checkWidth(); // проверит при загрузке страницы
//
//   $(window).resize(function(){
//     checkWidth(); // проверит при изменении размера окна клиента
//   });
// });


$('.lblInp input').keyup(function() {
  if($(this).val().length > 0){
    $(this).closest('.lblInp input').addClass('filled');
  }
  else{
    $(this).closest('.lblInp input').removeClass('filled');
  }
});


var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');

  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },6000);
};

var classname = document.getElementsByClassName("button");

for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', animateButton, false);
}
