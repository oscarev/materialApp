//AJAX JQUERY

//CARGA PAGINA MAQUINAS
function cargarMaquinas(url,codigo_centro) {

var x=0;

    $.get(url,{maquinas:codigo_centro},exito,"json")
          .fail(error)
          .always(siempre);


    function exito(data){

      //data: array de maquinas
          for (var i = 0; i < data.length; i++) {


            //mostrar cada maquina
              imagenMaquinas(data[i]);

          }

      }

      function error(){

          alert('error');

      }

      function siempre(){

          console.log('bien');

      }


}

//CARGAR FICHA MAQUINA
function ajaxFicha(e) {

    e.preventDefault();
    e.stopImmediatePropagation();//evita que se ejecute la funcion varias veces

    var $cod=$(this).data('cod');

    $url="../DB_maquinaria/DB_maquinaria.php";

    var peticion = $.ajax({

          url:  $url,
          type: 'POST',
          data: {'cod': $cod},

      success: function(respuesta) {

          var resp=JSON.parse(respuesta);

          verFicha(resp);

      },

      error: function() { alert('Se ha producido un error'); }

    });



}

//INSERTAR DATOS BD --->INCLUYE EL CALLBACK PARA GESTIONAR LA
                      //SINCRONIZACION DE LAS LLAMADAS A AJAX

function insertarDatos($cod,$datoEnvio,callback){

     console.log($datoEnvio);

     $url="../DB_maquinaria/insertarDatos.php";;

     var peticion = $.ajax({

       url:  $url,
       type: 'POST',
       data: {'nueva':$datoEnvio},
       success: function(respuesta) {

         if(respuesta=='sesion_caducada'){

           window.location.href = "../../../login/login.html";

         }else{

           callback(null,respuesta);

         }

       },

       error: function() { alert('Se ha producido un error'); }

     });

 }




//TABALA HISTORIAL DE LA FICHA
  function llamadaHistorial(cod) {

      var $cod=cod;

      $url="../DB_maquinaria/DB_maquinaria.php";

      var peticion = $.ajax({

            url:  $url,
            type: 'POST',
            data: {'nuevoHistorial': $cod},

        success: function(respuesta) {

            var resp=JSON.parse(respuesta);

            console.log(resp);

            //borrar Tabla Antigua
              $('#myTable').remove();

            //añadir nuevaTabla
            var $newTable=verHistorial(resp);
            $newTable.attr('id', 'myTable');
            $('.historial').append($newTable);

            //asignar el evento para ordenar la tabla una vez cargada
            $('table thead th').on('click',ordenarColumna);


            //asignar el evento para ordenar la tabla una vez cargada
            $('table thead th').on('click',ordenarColumna);

        },

        error: function() { alert('Se ha producido un error'); }

      });

 }

function cerrarSesion(){

  $url="../../../login/servidor_login/login.php";


  var peticion = $.ajax({

        url:  $url,
        type: 'POST',
        data: {'cerrarSesion':""},

    success: function(respuesta) {

        console.log(respuesta);
        window.location.href = "../../../login/login.html";


    },

    error: function() { alert('Se ha producido un error'); }

  });

}

//REPORTES
function crearReportes(){

  $url="../DB_maquinaria/reportes.php";

   var peticion = $.ajax({

     url:  $url,
     type: 'POST',
     data: {'reportes':''},
     success: function(respuesta) {

      //descargar el excel con los datos del reporte
       descargarExcel(respuesta);

   },

      error: function() { alert('Se ha producido un error'); }

   });

 }


 //TABALA HISTORIAL DE LA FICHA
   function infoTareas(e) {

       e.stopImmediatePropagation();//evita que se ejecute la funcion varias veces
      //obtener el codigo de la maquina almacenado en el boton nuevaBtn
       var $cod=$('#nuevaBtn').data('maquinaRevision').getCodigo();

       $url="../DB_maquinaria/infoTareas.php";

       var peticion = $.ajax({

             url:  $url,
             type: 'POST',
             data: {'informacionTareas': $cod},

         success: function(respuesta) {

             var resp=JSON.parse(respuesta);

             //borrar Tabla Antigua
               $('#infTareas').remove();

             //añadir nuevaTabla
             var $newTable=mostrarInfoMaq(resp);
             $newTable.attr('id', 'infTareas');
             $('#infoMaqFicha').append($newTable);

         },

         error: function() { alert('Se ha producido un error'); }

       });

  }

  //MOSTRAR INFORMACION DE SESION
    function infoSesion() {

      //  e.stopImmediatePropagation();//evita que se ejecute la funcion varias veces

        $url="../DB_maquinaria/DB_maquinaria.php";

        var peticion = $.ajax({

              url:  $url,
              type: 'POST',
              data: {'informacion_sesion':""},

          success: function(respuesta) {

              var resp=JSON.parse(respuesta);

              console.log(resp);

              mostrarInfoSesion(resp);

          },

          error: function() { alert('Se ha producido un error'); }

        });

   }
