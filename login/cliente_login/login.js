
$(document).ready(function () {


  $('body').mousemove(function(event){

     var moveX=(($(window).width()/2)-event.pageX)*0.06;
     var moveY=(($(window).height()/2)-event.pageY)*0.06;//en cuanto mas alto el multiplicador, mas se desplaza

     $('.wrapper').css('margin-left',moveX+'px');
     $('.wrapper').css('margin-top',moveY+'px');

  });

      $('#login').on('click',datosLogin);


});

function datosLogin() {



    login('$nuevaRevision');

}
