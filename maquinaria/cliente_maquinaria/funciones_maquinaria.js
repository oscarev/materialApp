//MENU DESPLEGABLE:

function irMenu(e) {
    e.preventDefault();
    setTimeout ("enlaceMenu()", 100);

}

function enlaceMenu() {

  $('.nav_vertical').slideToggle(500);
  //mejor añadir una clase para que haga el desplegable...
  $('#reportes').toggle('slow');
  $('#volverCam').toggle('slow');
}

//-------------------------------------------------------------------//
//----------------------------------------------------------------------//


//FUNCIONES PARA ORDENAR LA TABLA POR COLUMNAS
//funcion principal que utilizara las otras 3 funciones: comparer, getCellValue y setIcon
function ordenarColumna(e){

    //evita que se ejecute dos veces
    e.stopImmediatePropagation();

  	console.log("Has pulsado el elemento: " + $(this).index());

  	//obtener la tabla padre;
     var table = $(this).parents('table').eq(0);

  	 //guardar y ordenar los datos de la columna con la funcion comparer definida
     var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
     this.asc = !this.asc
     if (!this.asc) {
        rows = rows.reverse()
     }
     for (var i = 0; i < rows.length; i++) {
        table.append(rows[i])
     }
     setIcon($(this), this.asc);
}

  // Para comparar los valores de la tabla entre sí
  function comparer(index) {
     return function(a, b) {
        var valA = getCellValue(a, index),
        valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
     }
  }

  // Obtiene los valores de cada celda
  function getCellValue(row, index) {

     return $(row).children('td').eq(index).html()

  }

  // Muestra gráficamente qué ordenamiento se está aplicando
  function setIcon(element, asc) {

     $("th").each(function(index) {
        $(this).removeClass("sorting");
        $(this).removeClass("asc");
        $(this).removeClass("desc");
     });
     element.addClass("sorting");
     if (asc) element.addClass("asc");
     else element.addClass("desc");

  }

  //-----------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------//

  //VALIDAR DATOS DEL FORMULARIO DE LA FICHA:
function validar($nuevaRevision){

      var $validar=true;

      if($nuevaRevision['revision']==null){

        alert('Debe introducir una fecha de Revision');

        $validar=false;
        return $validar;

      }

      if($nuevaRevision['periodo']==null){

          $validar=false;
          alert('Debe introducior un periodo correcto');
          return $validar;

      }

      if($nuevaRevision['empresa']=='Empresa...'){

          $validar=false;
          alert('Debe indicar una empresa');
          return $validar;

      }

      if($nuevaRevision['responsable']==null){

          $validar=false;
          alert('Debe indicar un responsable');
          return $validar;

      }

      if($nuevaRevision['revision']!=null&&Date.parse($nuevaRevision['revision'])>Date.parse($nuevaRevision['realizada'])){

          $validar=false;
          alert('La fecha de realizacion debe ser posterior a la fecha de revision');
          return $validar;

      }

      if($nuevaRevision['revision']!=null&&Date.parse($nuevaRevision['revision'])>Date.parse($nuevaRevision['proxima'])){

          $validar=false;
          alert('La fecha de proxima realizacion debe ser posterior a la revision');
          return $validar;

      }

        return $validar;

}

//-----------------------------------------------------------------------------------------------------//


//CERRAR LA FICHA DE DATOS DE LA MAQUINA:
function cerrarFicha(e){

  e.stopImmediatePropagation();

    $('.historial').remove();

    //borrar Tabla Antigua
      $('#infTareas').remove();
      $('#infoMaqFicha').css('display', 'none');

    $('.ficha').css('display', 'none');
    $('#formulario').css('display', 'none');

    //activar nuevamente el evento ajaxFicha en el resto de maquinas
    $('.name a').on('click',ajaxFicha);

}

//-----------------------------------------------------------------------------------------------------//

//CERRAR EL FORMULARIO PONIENDO LOS DATOS A 0:
function cerrarFormulario(){

    $('#formulario').css('display','none');

    $('[name="periodo"] option[value=""]').prop("selected",true);
    $('[name="responsable"] option[value=""]').prop("selected",true);

  //limpiar valores formulario
    $('#formdata')[0].reset();


}
//-----------------------------------------------------------------------------------------------------//

//HABILITAR LOS OPTIONS PERIODO EN FUNCION DEL RADIOBUTTON SELECCIONADO:
function habilitarPeriodos(e){

  e.stopImmediatePropagation();

    if(this.value=='correctiva'){

      $('[name="periodo"] option[value="correctiva"]').prop("selected",true);

      for (var i = 0; i < $('[name="periodo"]').children('option').length; i++) {

            var $option=$('[name="periodo"]').children('option')[i].value;

            if($option!="correctiva"){

               $('[name="periodo"] option[value="'+$option+'"]').prop("disabled","disabled");

            }else{

              $('[name="periodo"] option[value="correctiva"]').prop("disabled",false);

            }

       }

    }else{

      $('[name="periodo"] option[value=""]').prop("selected",true);

      for (var i = 0; i < $('[name="periodo"]').children('option').length; i++) {

            var $option=$('[name="periodo"]').children('option')[i].value;

            if($option!="correctiva"){

               $('[name="periodo"] option[value="'+$option+'"]').prop("disabled",false);

            }else{

              $('[name="periodo"] option[value="'+$option+'"]').prop("disabled",true);

            }

       }

    }

}


//-----------------------------------------------------------------------------------------------------//

//FORMATEAR Y CALCULAR LAS FECHAS:
function formatFechas(fecha){

        var fechaArray=fecha.split('-')

        var dia = fechaArray[2];
        var mes = fechaArray[1];
        var anio = fechaArray[0]; ;

        var fechatotal = dia + "/"+ mes +"/" + anio

        return fechatotal;

}


function establecerProxima(){

    var $fecha=$('[name="revision"]').val();
    var $periodo= $('[name="periodo"]').val();

    var $fechaProxima=calcularFechas($fecha,$periodo);

    var $dia=$fechaProxima.getDate();
    //los meses se obtienen de 0 a 11
    var $mes=$fechaProxima.getMonth()+1;
    var $anio=$fechaProxima.getFullYear();

    if ($dia < 10) {
        $dia = "0" + $dia;
    }
    if ($mes < 10) {
        $mes = "0" + $mes;
    }

    var $fechaFinal =  $anio+"-"+$mes+"-"+$dia ;

    $('[name="proxima"]').val($fechaFinal);


    if($('[name="periodo"]').val()=='correctiva'){

      $('[name="realizada"]').val($fechaFinal);

    }


}

function calcularFechas(fecha,periodo){

      var nuevaFecha = new Date(fecha);

      //periodo en meses de 30 dias y años de 365 dias
      switch(periodo) {

      case 'diaria':

            periodo=1;

            break;

      case 'semanal':

          periodo=7;

          break;

      case 'mensual':

        periodo=30;

        break;

      case 'trimestral':

        periodo=90;

        break;

      case 'semestral':

          periodo=180;

        break;

      case 'anual':

            periodo=365;//dias

        break;

      case 'OCA':

        periodo=1825;//dias

        break;

      default:

        periodo=0;
    }

      nuevaFecha.setDate(nuevaFecha.getDate() + periodo);

      return nuevaFecha;

}

function colorRevisiones(fechaProx){

      var d = new Date();
      var f=new Date(fechaProx);

      var diasdif= f-d;
      var contdias = Math.round(diasdif/(1000*60*60*24));

      return contdias;

}

//-----------------------------------------------------------------------------------------------------//


//CREAR EL ARCHIVO EXCEL CON LOS DATOS DE AJAX
function descargarExcel(variable_conTabla){

        //Creamos un Elemento Temporal en forma de enlace
        var tmpElemento = document.createElement('a');

        // Obtenemos la información de la tabla
        var data_type = 'data:application/vnd.ms-excel';
        var tabla_div = variable_conTabla;
        //crear la tabla html
        var nuevaTabla=$(tabla_div);
        //obtener los datos del elemento tabla html [0], con el formato correcto
        var tabla_html = nuevaTabla[0].outerHTML.replace(/ /g, '%20');
        //crear la cabecera del archivo excel con los datos
        tmpElemento.href = data_type + ', ' + tabla_html;
        //Asignamos el nombre a nuestro EXCEL
        tmpElemento.download = 'datosMaquinas.xls';
        // Simulamos el click al elemento creado para descargarlo
        tmpElemento.click();

}

//-----------------------------------------------------------------------------------------------------//

//CREAR CODIGOS QR maquinas

function crearQRmaq(){

  //obtener codigo maquina

  var $codigoMaquina=this.lastElementChild.getAttribute('id');


//borrar canvas anterior
  $("#"+$codigoMaquina+">canvas").remove();
  $("#"+$codigoMaquina+">img").remove();


  var qrcode = new QRCode(document.getElementById($codigoMaquina),{

                    text: $codigoMaquina,
                    width: 190,
                    height: 190,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H

               });


               setTimeout(function(){imprimirCod($codigoMaquina);},50);

}


function imprimirCod($codigoMaquina) {

    var divToPrint=document.getElementById($codigoMaquina);

    var newWin=window.open('','Print-Window');

    newWin.document.open();

    newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

    newWin.document.close();

    setTimeout(function(){newWin.close();},50);


}

//-----------------------------------------------------------------------------------------------------//
