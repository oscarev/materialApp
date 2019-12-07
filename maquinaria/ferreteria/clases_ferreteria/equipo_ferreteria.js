

function Equipo(codigo, tipo, marca, modelo, fabricacion, caducidad,img){

        this._codigo = codigo;
        this._tipo = tipo;
        this._marca = marca;
        this._modelo = modelo;
        this._fabricacion = fabricacion;
        this._caducidad = caducidad;
        this._img= img;

        this._tareas=new Array;
        this._revisiones=new Array;

}


Equipo.prototype.getCodigoEquipo=function(){


    return this._codigo;

}

Equipo.prototype.getTipo=function(){


    return this._tipo;

}


Equipo.prototype.getMarcaEquipo=function(){


    return this._marca;

}

Equipo.prototype.getModeloEquipo=function(){


    return this._modelo;

}

Equipo.prototype.getFabricacionEquipo=function(){


    return this._fabricacion;

}

Equipo.prototype.getCaducidadEquipo=function(){


    return this._caducidad;

}

Equipo.prototype.getImgEquipo=function(){


    return this._img;

}


Equipo.prototype.addRevisionEquipo=function(id_rev, cod_equipo, f_rev_eq, f_prox_rev_eq, f_realizacion_eq){


    var rev = new RevisionFerreteria(id_rev, cod_equipo, f_rev_eq, f_prox_rev_eq, f_realizacion_eq);

        this._revisiones.push(rev);


}

Equipo.prototype.getRevisionEquipo=function(id_rev){


    for (var i = 0; i < this._revisiones.length; i++) {


        if (this._revisiones[i].getCodigoEquipo()=== id_rev)
        {

            return this._revisiones[i];
        }

    }

}

Equipo.prototype.addTareaEquipo=function(cod_info_tarea, codigo_maq,nombre_responsable,descripcion_tarea,periodo_tarea){


    var rev = new Tarea(cod_info_tarea, codigo_maq,nombre_responsable,descripcion_tarea,periodo_tarea);

        this._tareas.push(rev);


}

Equipo.prototype.getTareasEquipo=function(cod_info_tarea){


    for (var i = 0; i < this._revisiones.length; i++) {


        if (this._tareas[i].getCodigoTareaEquipo()=== cod_info_tarea)
        {

            return this._tareas[i];
        }

    }

}
