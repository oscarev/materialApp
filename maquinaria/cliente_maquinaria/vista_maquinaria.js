
$(document).ready(function () {

        $('.hamburger').click(function () {

            $('.hamburger').toggleClass('open');
        });


        $('.hamburger').on('click', irMenu);

        $('#nuevaBtn').on('click', nuevaRev);
        $('#cerrarFormulario').on('click', cerrarFormulario);

        var $codigo_centro=$centro.getCod_centro();

        //cargar imagenes maquinas segun el codigo del centro de trabajo
        cargarMaquinas("../DB_maquinaria/DB_maquinaria.php",$centro.getCod_centro());


      //asignar los eventos en los elementos ya definidos al cargar la pagina
      //en caso contrario, ejecutara tantos eventos como ejecutes la funcion que los crea
        $('#nuevaRev').on('click', insertarRevision);

        $('#nuevaRev').on('click', enviarAjax);


        //mostrar ocultar informacion de sesion
        $('#logoSesion').on('click',infoSesion);
        $('aside div:first-child').on('click',cerrarInfoSesion);
        $('aside a').on('click',cerrarSesion);

        //POSICIONAR EL BOTON DE REPORTES:
        posicionarRep();
        //POSICIONAR INFO SESIONES
        posicionarInfoSesion();

          //FUNCION QUE CAPTURA CAMBIOS EN LA VENTANA
          $( window ).resize(function() {

            posicionarRep();

            posicionarInfoSesion();


          });


      //DESCARGAR REPORTE:
      //podria realizarse sin ajax, con el metodo submit de un formulario
       $('#reportes i').on('click',crearReportes);

       $('#infoMaq i').on('click',infoTareas);

       //boton para volver a la camara de REVISIONES
       $('#volverCam').on('click',volverCamara);




});

function imagenMaquinas(maquina) {

  var new_maquina=new Maquina(maquina.cod,maquina.nombre,maquina.descripcion,maquina.img);

    var $imagenMaq=$("<div></div>");
    $imagenMaq.addClass('imagen_equipo');


    var $qrMaq=$("<div></div>");
    $qrMaq.addClass('qrMaq');

    //CREAR EL CODIGO QR DE LA MAQUINA (permanecera oculto);
    var $qrMaquina=$("<span></span>");
    $qrMaquina.attr('id',new_maquina.getCodigo());
    $qrMaquina.css('display','none');

    var $icoQR=$("<i>");
    $icoQR.addClass('fa fa-qrcode');
    $qrMaq.append($icoQR);
    $qrMaq.append($qrMaquina);
    $qrMaq.on('click',crearQRmaq);

    //url con interpolacion {}
    var imageUrl = new_maquina.getImg();
    $imagenMaq.css('background-image', `url(imagenes/${imageUrl})`);

    var $nombreMaq=$("<div></div>");
    $nombreMaq.addClass('name');
    var $enlaceName=$('<a></a>');
    $enlaceName.data('cod',new_maquina.getCodigo());
    $enlaceName.text(new_maquina.getNombre());
    $nombreMaq.append($enlaceName);

    $enlaceName.on('click',ajaxFicha);

    var $spandCod=$('<span></span>');
    $spandCod.text(new_maquina.getCodigo());

    var revOCA= maquina.maxim;
    var proxOCA=maquina.maxim_p;

    var  $spandRev=$('<span></span>');
    $spandRev.text(revOCA.split('-')[2]+'/'+revOCA.split('-')[1]+'/'+revOCA.split('-')[0]);
    var $spandProxRev=$('<span></span>');
    $spandProxRev.text(proxOCA.split('-')[2]+'/'+proxOCA.split('-')[1]+'/'+proxOCA.split('-')[0]);

    var $codMaq=$("<div></div>");
    $codMaq.addClass('datos_equipos');
    $codMaq.text('Cod: ');
    $codMaq.append($spandCod);

    var $revisionMaq=$("<div></div>");
    $revisionMaq.addClass('datos_equipos');
    $revisionMaq.text('OCA: ');
    $revisionMaq.append($spandRev);

    var $prox_revMaq=$("<div></div>");
    $prox_revMaq.addClass('datos_equipos');
    $prox_revMaq.text('Prox.: ');
    $prox_revMaq.append($spandProxRev);

    $imagenMaq.append($qrMaq);
    $imagenMaq.append($nombreMaq);
    $imagenMaq.append($codMaq);
    $imagenMaq.append($revisionMaq);
    $imagenMaq.append($prox_revMaq);

    $('section').append($imagenMaq);

}


function verFicha(maquina){

//si hay, borrar la tabla de historial anterior
  $('table').remove();

  //desactivar evento ajaxFicha del resto de maquinas
  $('.name a').off('click',ajaxFicha);

  //DATOS MAQUINA
  var $revisionesCabecera=maquina[0];
  var $maquinaRevision=new Maquina($revisionesCabecera[0]['cod_maq'],$revisionesCabecera[0]['nombre'],$revisionesCabecera[0]['descripcion']);


  //DATOS REVISIONES

  var $revisiones=maquina[1];

  var $revisionesOCA=new Revision($revisionesCabecera[0]['cod'],$revisionesCabecera[0]['cod_maq'],$revisionesCabecera[0]['f_rev'],$revisionesCabecera[0]['f_prox_rev'],$revisionesCabecera[0]['periodo'],$revisionesCabecera[0]['tipo'],$revisionesCabecera[0]['responsable']);
  var $revisionesProx=new Revision($revisionesCabecera[1]['cod'],$revisionesCabecera[1]['cod_maq'],$revisionesCabecera[1]['f_rev'],$revisionesCabecera[1]['f_prox_rev'],$revisionesCabecera[1]['periodo'],$revisionesCabecera[1]['tipo'],$revisionesCabecera[1]['responsable']);

  $('.ficha').css('display','block');

      var $nombreMaquina=$('#datosMaquina span:nth-child(1)');
      $nombreMaquina.text($maquinaRevision.getNombre());
      var $cerrarFicha=$('#datosMaquina span:nth-child(2)');
      $cerrarFicha.on('click',cerrarFicha);
      var $codigoMaquina=$('#datosMaquina span:nth-child(3)');
      $codigoMaquina.text('Cod.: '+$maquinaRevision.getCodigo());
      var $descripcion=$('#datosMaquina span:nth-child(4)');
      $descripcion.text($maquinaRevision.getDescripcion());

      var $revisionOficial=$('#datosOCA span:nth-child(1)');
      $revisionOficial.text('OCA: '+$revisionesOCA.getF_rev());
      var $proxRevOf=$('#datosOCA span:nth-child(2)');
      $proxRevOf.text('Prox.: '+$revisionesOCA.getF_prox_rev());

      var $revisionMaquina=$('#datosRevision span:nth-child(1)');
      $revisionMaquina.text('Rev.: '+$revisionesProx.getF_rev());
      var $prox_Rev_Maquina=$('#datosRevision span:nth-child(2)');
      $prox_Rev_Maquina.text('Prox.: '+$revisionesProx.getF_prox_rev());
      var $periodoRevision=$('#datosRevision span:nth-child(3)');
      $periodoRevision.text($revisionesProx.getPeriodo());

      //guardar objeto maquina en el boton NUEVA
      var $botonNueva=$('#nuevaBtn');
      $botonNueva.data('maquinaRevision',$maquinaRevision);


      var $historial=$("<div></div>");
      $historial.addClass('historial');

      var $anchoDispositivo=$(window).width();

      $('.ficha').append($historial);

      llamadaHistorial($maquinaRevision.getCodigo());

}



function verHistorial (maquina){

  //ordenar las revisiones para que la primera sea la revision mas proxima.
  maquina.sort(function (a, b){

          if(parseInt(a.minimo)>0&&a.f_realizacion==""){


              return parseInt(a.minimo)-parseInt(b.minimo);

          }

  });

  //console.log(maquina.reverse());

      console.table(maquina);
      console.log(maquina[0]['cod_maq']);


      var $tabla=$('<table></table>');
      $tabla.attr("id","tablaOrdenable");

      var $tablaCampos=$('<thead><tr><th>Rev.</th><th>Tipo</th><th>Periodo</th>'
      +'<th>Fecha</th><th>Prox.</th><th>Realizada</th><th>Responsable</th><th>Empresa</th>X<th></th></tr></thead><tbody></tbody>');

      $tabla.append($tablaCampos);

      for (var i = 0; i < maquina.length; i++) {

        $revision=new Revision(maquina[i]['cod'],maquina[i]['cod_maq'],maquina[i]['f_rev'],maquina[i]['f_prox_rev'],maquina[i]['periodo'],maquina[i]['tipo'],maquina[i]['f_realizacion'],maquina[i]['responsable'],maquina[i]['empresa']);

        var $empresa;

          if($revision.getEmpresa()==null||$revision.getEmpresa()==""){

              $empresa="";

          }else{

            $empresa= $revision.getEmpresa();
          }

          var $enlace=$('<a href="#">Editar</a>');
          $enlace.data('revision',$revision);

            //evento editar si la revision no esta cerrada
              if(!$revision.getF_realizacion()==''){

                  $enlace.css('opacity',0.6);
                  $enlace.css('cursor','initial');

              }else{


                $enlace.on('click',nuevaRev);

              }

          var $tablaDatos=$('<tr><td>'+$revision.getCod()+'</td><td>'+$revision.getTipo()+'</td><td>'
          +$revision.getPeriodo()+'</td><td>'+$revision.getF_rev()+'</td><td>'+$revision.getF_prox_rev()+'</td><td>'+$revision.getF_realizacion()
          +'</td><td>'+$revision.getResponsable()+'</td><td>'+$empresa+'</td></tr>');



          //cambiar el color en funcion del tiempo restante 7 dias rojo, 30 dias naranja
          if(colorRevisiones($revision.getF_prox_rev())<7&&$revision.getF_realizacion()==""){

            $tablaDatos.css('color','red');
            $enlace.css('color','red');

          }else if (colorRevisiones($revision.getF_prox_rev())<15&&$revision.getF_realizacion()=="") {

            $tablaDatos.css('color','orange');
            $enlace.css('color','orange');

          };

          var $casillaEnlace=$('<td></td>');
          $casillaEnlace.append($enlace);
          $tablaDatos.append($casillaEnlace);
          $tabla.append($tablaDatos);

      }

      return $tabla;

}

//MOSTRAR FORMULARIO Y CARGAR DATOS
function nuevaRev() {

  //limpiar valores formulario por name
  $("#formdata").find(':input').each(function() {
        switch(this.name) {
            case 'codRev': $(this).val("");
            case 'codMaq': $(this).val("");
            case 'revision':$(this).val("");
            case 'proxima':$(this).val("");
            case 'realizada':$(this).val("");
            case 'empresa':$(this).val("");
            case 'periodo':
              $('[name="periodo"] option[value=""]').prop("selected",true);
            case 'periodo':
              $('[name="responsable"] option[value=""]').prop("selected",true);
        }
   });

       $('#formulario').css('display','flex');

            //establecer el metodo change para calcular la proxima revision
                $('[name="revision"]').on('change',establecerProxima);
                $('[name="periodo"]').on('change',establecerProxima);


          //habilitar options periodo en funcion radioButton seleccionado:
          $('[name="tipo"]').on('change',habilitarPeriodos);



    if ($(this).attr('id')=='nuevaBtn'){

      //obtener objeto de la maquina
      var $codMaq=$(this).data('maquinaRevision');

        //incluir datos cabecera formulario
        $('#revMaq span:nth-child(3)').text('Rev:');
        $('#revMaq span:nth-child(5)').text($codMaq.getNombre());
        $('#revMaq span:nth-child(4)').text($codMaq.getCodigo());

        //valores inputs hidden del formulario:
         //$('[name="codRev"]').val($codMaq.codRev);
         $('[name="codMaq"]').val($codMaq.getCodigo());


    } else{

          //datos de la revision desde el enlace de la tabla
          var $revision=$(this).data('revision');

          $('#revMaq span:nth-child(3)').text('Rev: '+$revision.getCod());
          //obtenter nombre maquina:
          var $name=$('#datosMaquina span:first-child').text();

          $('#revMaq span:nth-child(5)').text($name);
          $('#revMaq span:nth-child(4)').text($revision.getCod_maq());

          if ($revision.tipo=='preventiva'){

              //activar radio button
               $("#radio1").prop('checked',true);

          } else {

              //activar radio button
              $("#radio2").prop('checked',true);

          }

          //seleccionar los select por name
           $('[name="periodo"] option[value="'+ $revision.getPeriodo()+'"]').prop("selected",true);
           $('[name="responsable"] option[value="'+ $revision.getResponsable()+'"]').prop("selected",true);

           //el formato para las fechas es "yyyy-MM-dd" aunque aparezca dd/mm/yyyy
           $('[name="revision"]').val($revision.getF_rev());

           $('[name="proxima"]').val($revision.getF_prox_rev());
           $('[name="realizada"]').val($revision.getF_realizacion());

           if($revision.getEmpresa()!=null&&$revision.getEmpresa()!=""){

             $('#empresa').val($revision.getEmpresa());

           }

           //valores inputs hidden:
            $('[name="codRev"]').val($revision.getCod());
            $('[name="codMaq"]').val($revision.getCod_maq());


      }

}

//-----------------------------------------------------------------------------------------------------//

//INSERTAR LOS NUEVOS DATOS EN LA BD:

function insertarRevision() {

  var $datosForm= $('#formdata').serialize();

  var $datosArr=$datosForm.split('&');

//hay que crear el array con este formato
  var $nuevaRevision={};

  for (var i = 0; i < $datosArr.length; i++) {

      var $clave=$datosArr[i].split('=')[0];
      var $valor=$datosArr[i].split('=')[1];

      if($valor==""){

        $valor=null;

      }

        $nuevaRevision[$clave]=$valor

  }

    $('#nuevaRev').data('datosRevision',$nuevaRevision);

}

//EJECUTAR LAS LLAMADAS AJAX
function enviarAjax(){

    //obtener objeto json de la revision de los datos del formulario
    var $nuevaRevision=$(this).data('datosRevision');

    //"pasarlo" a JSON para la peticion ajax
    var $datoEnvio=JSON.stringify($nuevaRevision);
    var $cod=$nuevaRevision.codMaq;

    //VALIDAR TODOS LOS DATOS
    if(validar($nuevaRevision)){

          //EJECUTAR EL CALLBACK DE LA PETICION AJAX
          insertarDatos($cod, $datoEnvio, function(){

              cerrarFormulario();

              //EJECUTAR LA SEGUNDA PETICION AJAX AL FINALIZAR EL INSERT
              llamadaHistorial($cod);

          });

    }

}

//-----------------------------------------------------------------------------------------------------//

//MOSTRAR INFORMACION DE SESIONES

function mostrarInfoSesion($usuario){

    $('aside').css('display','flex');

    $user=new Usuario($usuario.idUsuario, $usuario.nombreUsuario, $usuario.email, $usuario.password, $usuario.codResp);

    $('aside div:nth-child(2)').text('user: '+$user.getIdUsuario()+'-'+$user.getNombreUsuario());
    $('aside div:nth-child(3)').text($user.getEmail());


}
//cerrar informacion SESIONES
function cerrarInfoSesion(){

  $('aside').css('display','none');

}

//-----------------------------------------------------------------------------------------------------//

//POSICIONAR EL BOTON DE REPORTES
function posicionarRep(){

    var $anchoP=$('body').width();

    if($anchoP<1000){

      var $posicion=$anchoP-50;

      $('#reportes').css('left',$posicion+'px');
      $('#volverCam').css('left',$posicion+'px');

    }else if($anchoP>1000&&$anchoP<1200){

      var $posicion=$anchoP-80;

      $('#reportes').css('left',$posicion+'px');
      $('#volverCam').css('left',$posicion+'px');


    }else{

      var $posicion=($anchoP-1200)/2+1100;

      $('#reportes').css('left',$posicion+'px');
      $('#volverCam').css('left',$posicion+'px');

    }

}

//-----------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------//

//MOSTRAR FICHA INFORMACION REVISIONES Maquina

function mostrarInfoMaq($informacionTareas){

    $('#myTable').toggle();

    var $tabla=$('<table></table>');
    $tabla.attr("id","infTareas");

    var $tablaCampos=$('<thead><tr><th colspan=3 style=text-align:center>PLANIFICACION DE MANTENIMIENTO PREVENTIVO</th></tr><tr><th>Tareas de Mantenimiento</th><th>Periodicidad</th>'
    +'<th>Responsable</th></tr></thead><tbody></tbody>');

    $tabla.append($tablaCampos);

    for (var i = 0; i < $informacionTareas.length; i++) {

        var $tarea= new Tarea ($informacionTareas[i]['codigo_info_tara'],$informacionTareas[i]['codigo_maq'],$informacionTareas[i]['nombre_responsable'],$informacionTareas[i]['descripcion_tarea'],$informacionTareas[i]['periodo_tarea']);

        var $tablaDatos=$('<tr><td>'+$tarea.getDescripcionTarea()+'</td><td>'+$tarea.getPeriodoTarea()+'</td><td>'
        +$tarea.getNombreResponsable()+'</td></tr>');

        $tabla.append($tablaDatos);

   }

     $('#infoMaqFicha').toggle();

     return $tabla;


}

function posicionarInfoSesion(){


  var $anchoP=$('body').width();


  if($anchoP<1024){

    var $posicion=0;

    $('aside').css('right',$posicion);

  }else if($anchoP>1023&&$anchoP<1200){

        var $posicion=(1024*65)/$anchoP;


        if($posicion>45&&$posicion<60){

          $posicion=66;

        }else if($posicion>60){

            $posicion=55;

        }else{

            $posicion=47;

        }



        $('aside').css('right',$posicion+'px');


      }else{

        var $posicion=($anchoP-1200)/2+71;

        $('aside').css('right',$posicion+'px');

      }

}


function volverCamara(){

      window.location.href="maquinaria_taller_encargado.php";

}
