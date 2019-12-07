//AJAX JQUERY

//BUSCAR EQUIPO CON QR
function buscarEquipoQr(id_equipo){


  var data={'id_equipo':'123456','tipo_equipo':'elemento','marca_equipo':'marca','modelo_equipo':'modelo',
  'fabricacion_equipo':'2019-12-01','caducidad_equipo':'2019-12-08','img_equipo':'Imagen1.png','fecha_rev':'2019-12-08','prox_rev_eq':'2019-12-15'};

  var data2={'id_equipo':'1234567','tipo_equipo':'elemento','marca_equipo':'marca','modelo_equipo':'modelo',
  'fabricacion_equipo':'2019-12-01','caducidad_equipo':'2019-12-08','img_equipo':'esc_000.jpg','fecha_rev':'2019-12-08','prox_rev_eq':'2019-12-15'};


      if(equipoID.includes(id_equipo)==false){

          alert('No existe el codigo ID en la BD');

       }else if(id_equipo=='123456'){

          mostrarEquipo(data);
          $('#cam').css('display','none');

      }else{

          mostrarEquipo(data2);
          $('#cam').css('display','none');
      }

}

//BUSCAR EQUIPO POR ID
function buscarEquipoId(){

  var id_equipo=$('#codigoE').val();


                if(equipoID.includes(id_equipo)==false){

                    alert('No existe el codigo ID en la BD');

                }else{

                    buscarCodigoQr(id_equipo);

                }


}

//MOSTRAR EQUIPO POR ID
function mostrarEquipoId(){

  var idEquipo=$('#codigoE').val();

  var data={'id_equipo':'123456','tipo_equipo':'elemento','marca_equipo':'marca','modelo_equipo':'modelo',
  'fabricacion_equipo':'2019-12-01','caducidad_equipo':'2019-12-08','img_equipo':'Imagen1.png','fecha_rev':'2019-12-08','prox_rev_eq':'2019-12-15'};

  var data2={'id_equipo':'1234567','tipo_equipo':'elemento','marca_equipo':'marca','modelo_equipo':'modelo',
  'fabricacion_equipo':'2019-12-01','caducidad_equipo':'2019-12-08','img_equipo':'esc_000.jpg','fecha_rev':'2019-12-08','prox_rev_eq':'2019-12-15'};


      if(equipoID.includes(idEquipo)==false){

          alert('No existe el codigo ID en la BD');

       }else if(idEquipo=='123456'){

          mostrarEquipo(data);

          $('article').toggle();

      }else{

          mostrarEquipo(data2);
          $('article').toggle();
      }


}


function insertarEquipo($nuevoEquipo){


  $url="../ferreteria/DB_ferreteria/insertar_ferreteria.php";;

  var peticion = $.ajax({

    url:  $url,
    type: 'POST',
    data: {'nuevoEquipo':$nuevoEquipo},

    success: function(respuesta) {

      if(respuesta=='sesion_caducada'){

        window.location.href = "../../../login/login.html";

      }else{

        console.log(respuesta);
        console.log('Equipo insertado con exito');

      }

    },

    error: function() { alert('Se ha producido un error'); }

  });



}

function subirArchivo($nuevoArchivo){


    alert('archivo subido con exito');

    equipoID.push($nuevoArchivo);

}

//MOSTRAR EQUIPO POR ID
function mostrarArchivo(){

  var $idEquipo=$('#idEquipo').text();


      if($idEquipo=='123456'){

        var $img='08Completa.pdf'

      }else{

        var $img='3.1. DWES08_CONT_R06_OAuth2.jpg'

      }

        $('iframe').attr('src','archivos/'+$img);

        $ancho=$(window).width()-20;
        $alto=$(window).height()-80;

        if($ancho>1180){

          $ancho=1180;

        }

        $('#archivoEquipo').css('height',$alto+'px');
        $('#archivoEquipo').css('width',$ancho+'px');

        //mostrar Archivo
          $('#archivoEquipo').css('display','flex');
          $('#equipo').toggle();


}


function insertarNuevaRevision($cod,$datosEnvio,callback){

  $url="../ferreteria/DB_ferreteria/insertar_ferreteria.php";


  var $revisionEnvio=JSON.stringify($datosEnvio);

  var peticion = $.ajax({

    url:  $url,
    type: 'POST',
    data: {'nuevaRevisionEq':$revisionEnvio},

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



//MOSTRAR EQUIPO POR ID
function mostrarNuevaRevision(idequipoRevision){

  var $idEquipo=idequipoRevision;

    url="../ferreteria/DB_ferreteria/DB_ferreteria.php";

          var peticion = $.ajax({

            url:  $url,
            type: 'POST',
            data: {'nuevaRE':$idEquipo},

            success: function(respuesta) {

              if(respuesta=='sesion_caducada'){

                window.location.href = "../../../login/login.html";

              }else{

                console.log(respuesta)

                var $newEquipo=JSON.parse(respuesta);

                mostrarEquipo($newEquipo);

                  //ocultar FORMULARIO
                   $('archivoEquipo').toggle();

              }

            },

            error: function() { alert('Se ha producido un error'); }

          });


}
