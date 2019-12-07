
//VALIDAR DATOS DEL FORMULARIO DE LA FICHA:
function validarEquipo($nuevoEquipo){

    var $validar=true;

    if($nuevoEquipo['tipoEquipo']==null){

        $validar=false;
        alert('Debes seleccionar un tipo de equipo');
        return $validar;

    }

    if($nuevoEquipo['fabricacion']==null){

        $validar=false;
        alert('Debes indicar la fecha de fabricacion del producto');
        return $validar;

    }

    if($nuevoEquipo['caducidad']==null){

        $validar=false;
        alert('Debes indicar la fecha de caducidad del producto');
        return $validar;

    }

    if($nuevoEquipo['revisionE']==null){

        $validar=false;
        alert('La fecha de revision debe ser posterior a la de fabricacion');
        return $validar;

    }

    if($nuevoEquipo['prox_revisionE']==null||Date.parse($nuevoEquipo['revisionE'])>Date.parse($nuevoEquipo['prox_revisionE'])){

        $validar=false;
        alert('Introduce una fecha correcta para la proxima revision');
        return $validar;

    }

      return $validar;

}
