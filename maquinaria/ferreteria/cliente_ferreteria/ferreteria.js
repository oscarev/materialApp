$(document).ready(function () {


      equipoID=['123456','1234567'];


      $('#camaraBtn').on('click',mostrarCamara);

      $('#newQr').on('click',mostrarFormulario);
      $('#reset').on('click',resetearValores);

      //buscar por codigo:
      $('#buscarQr').on('click',buscarEquipoId);

      //MOSTRAR EQUIPO por codigo:
      $('#mostrarEq').on('click',mostrarEquipoId);

      //MOSTRAR ARCHIVO por codigo:
      $('#idEquipo').on('click',mostrarArchivo);

      //cerrar camara
      $('#cam :nth-child(1)').on('click',mostrarCamara);

      //cerrar equipo
      $('#equipo i').on('click',cerrarEquipo);

      //INSERTAR NUEVO Equipo
      $('#confirmar').on('click',nuevoEquipo);


      //INSERTAR NUEVA Revision
      $('#revisionEquipo').on('click',nuevaRevisionEquipo);

      //cerrar iframe
      $('#cerrarIframe').on('click',cerrarIframe);



//ESCANEAR CODIGO QR--------------------------------------------------------------------------//

      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

      scanner.addListener('scan', function (content) {

          //INCLUIR DATOS EQUIPO------------------//
          buscarEquipoQr(content);

      });

      Instascan.Camera.getCameras().then(function (cameras) {

        for (var i = 0; i < cameras.length; i++) {

            if(cameras.length==1||cameras[i].name.indexOf("facing back")!=-1){

              scanner.start(cameras[i]);

            }

        }

      }).catch(function (e) {
        console.error(e);
      });


});



function mostrarFormulario(){

  var $codE=$('#codigoE').val();

      if($codE==''){

          alert('Debe introducir el codigo del equipo');

      }else{

        datosQR();
        desactivarImprimir();
        $('#datosEquipo').css('display','grid');

      }


}

function activarImprimir(){

  $('#imp').on('click',imprimirCod);
  $('#imp i').css('color','gainsboro');
  $('#imp').css('cursor','pointer');

  $("#imp").hover(function(){
    $(this).css("background-color", "rgba(89, 91, 92, 0.7)");
    $(this).css('border-color','gainsboro');
    }, function(){
    $(this).css("background-color", "rgba(97, 96, 99)");
    $(this).css("border-color","rgba(195, 197, 214, 0.3)")
  });

}

function desactivarImprimir(){

    $('#imp').off()

    $('#imp i').css('color','grey');
    $('#imp').css('cursor','default');


}

function datosQR() {

      var $datosForm= $('#nuevoQr').serialize();

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

      $("#qrcode>canvas").remove();
      $("#qrcode>img").remove();

    if($nuevaRevision['codigoE']!=null){

             var qrcode = new QRCode(document.getElementById("qrcode"), {

              text: $nuevaRevision['codigoE'],
              width: 90,
              height: 90,
              colorDark : "#000000",
              colorLight : "#ffffff",
              correctLevel : QRCode.CorrectLevel.H

          });

    }


}


function mostrarCamara(){

    $('#cam').toggle();
    $('article').toggle();
    $('#datosEquipo').css('display','none');

    desactivarImprimir();

}


function imprimirCod() {

    var divToPrint=document.getElementById('qrcode');

    var newWin=window.open('','Print-Window');

    newWin.document.open();

    newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

    newWin.document.close();

    setTimeout(function(){newWin.close();},50);


}

function mostrarEquipo($equipo){

  console.log($equipo);

  //crear objeto EQUIPO
  var $eq=new Equipo($equipo['id_equipo'], $equipo['tipo_equipo'], $equipo['marca_equipo'], $equipo['modelo_equipo'], $equipo['fabricacion_equipo'], $equipo['caducidad_equipo'],$equipo['img_equipo'])


  //MOSTRAR VALORES

    $('#equipo').css('display','flex');

    $('#equipo img').remove();
    $("#qrcode>canvas").remove();
    $("#qrcode>img").remove();

    var $img=$("<img></img>");

    $img.attr("src","imagenes/"+$eq.getImgEquipo());
    $img.attr("align","center");

    $('#imgEquipo').append($img);

    $('#marca span:nth-child(1)').text($eq.getMarcaEquipo());
    $('#marca span:nth-child(2)').text($eq.getModeloEquipo());

    $('#idEquipo').text($eq.getCodigoEquipo());


    //DATOS DE LOS PSEUDO-ELEMENTOS AFTER:
    $("#fabricacion span:nth-child(1)").attr('data-content',$eq.getFabricacionEquipo());
    $("#fabricacion span:nth-child(2)").attr('data-content',$eq.getCaducidadEquipo());
    $("#revs span:nth-child(1)").attr('data-content',$equipo['fecha_rev']);
    $("#revs span:nth-child(2)").attr('data-content',$equipo['prox_rev_eq']);

    $('#revisionEquipo').data('nueva_revision',$equipo);


}

function cerrarEquipo(){

  $('#equipo').toggle();

  $('article').toggle();


}

function resetearValores(){

    $('#datosEquipo').toggle();

    $("#qrcode>canvas").remove();
    $("#qrcode>img").remove();


}

function buscarCodigoQr(){

    datosQR();

    activarImprimir();

}


function nuevoEquipo(){

  //crear objeto FormData con el archivo
  //var form = new FormData($("#nuevoQr")[0]);

      //datos del formulario
      $datosFormulario=$('#nuevoQr').serialize();

      console.log($datosFormulario);


      var $datosEquipo=$datosFormulario.split('&');

    //hay que crear el array con este formato
      var $nuevoEquipo={};

      for (var i = 0; i < $datosEquipo.length; i++) {

          var $clave=$datosEquipo[i].split('=')[0];
          var $valor=$datosEquipo[i].split('=')[1];

          if($valor==""){

            $valor=null;

          }

            $nuevoEquipo[$clave]=$valor

      }

      if(validarEquipo($nuevoEquipo)==true){

          if(confirm("Quieres crear un nuvo equipo?")==true){

            //var $datoEnvio=JSON.stringify($nuevoEquipo);

            //console.log($datoEnvio);

              //insertarEquipo($datoEnvio);

              subirArchivo($nuevoEquipo['codigoE']);

              $('#datosEquipo').css('display','none');

              activarImprimir();

          }else{

              $("#nuevoQr").find('input:text').val('');
              $('#tipoEquipo').val( $('#tipoEquipo').find("option[selected]").val() );
              $("#nuevoQr").find('input[type=date]').val('');
              $("#nuevoQr").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
              $('#datosEquipo').css('display','none');

          }

      };

}

function nuevaRevisionEquipo(){


    $datosRevision=$(this).data('nueva_revision');

    $datoRevision=$('#nuevaRevisionEquipo').serialize().split('=')[1];

    if($datoRevision==''){

        alert('Debes incluir una fecha de Revision');


    }else{

          $datosRevision['rev_realizada']=$datoRevision;

          $codigoEquipo=$datosRevision['id_equipo'];

          console.log($datosRevision);


          alert('revision equipo '+$codigoEquipo+' realizada con exito');
          $('#nuevaRevisionEquipo')[0].reset();
          //$('#nuevoQr')[0].reset();
          $('#equipo').toggle();
          $('article').toggle();



    }

}

function cerrarIframe(){

    $('#archivoEquipo').css('display','none');
    $('article').toggle();
}
