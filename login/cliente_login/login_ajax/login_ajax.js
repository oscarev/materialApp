

//AJAX JQUERY


function login($datoEnvio){



          if($datoEnvio=='error'){

              alert('El usuario o la contraseña no son correctos');
              //recargar página
              location.reload();

          }else{

              window.location.href="maquinaria/ferreteria/maquinaria_ferreteria.html";


          }



 }



  // DETECTAR DISPOSITIVO MOVIL

 function comprobarMobil(){

           var isMobile = {
               Android: function() {
                   return navigator.userAgent.match(/Android/i);
               },
               BlackBerry: function() {
                   return navigator.userAgent.match(/BlackBerry/i);
               },
               iOS: function() {
                   return navigator.userAgent.match(/iPhone|iPad|iPod/i);
               },
               Opera: function() {
                   return navigator.userAgent.match(/Opera Mini/i);
               },
               Windows: function() {
                   return navigator.userAgent.match(/IEMobile/i);
               },
            };

            if (isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows()||isMobile.Opera())
            {

               console.log('dispositivo movil');
              return true;
            }
            else
            {

               console.log('escritorio');
               return false;


            }
 }
