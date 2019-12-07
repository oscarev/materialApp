

function Maquina(codigo,nombre,descripcion,img){

        this._codigo = codigo;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._img= img;

        this._tareas=new Array;
        this._revisiones=new Array;

}


Maquina.prototype.getCodigo=function(){


    return this._codigo;

};

Maquina.prototype.getNombre=function(){


    return this._nombre;

};

Maquina.prototype.getDescripcion=function(){


    return this._descripcion;

};

Maquina.prototype.getImg=function(){


    return this._img;

};


Maquina.prototype.addRevision=function(revision){


        this._revisiones.push(revision);


};

Maquina.prototype.getRevision=function(cod){


    for (var i = 0; i < this._revisiones.length; i++) {


        if (this._revisiones[i].getCod()=== cod)
        {

            return this._revisiones[i];
        }

    }

};

Maquina.prototype.addTarea=function(cod_info_tarea, codigo_maq,nombre_responsable,descripcion_tarea,periodo_tarea){


    var rev = new Tarea(cod_info_tarea, codigo_maq,nombre_responsable,descripcion_tarea,periodo_tarea);

        this._tareas.push(rev);


};

Maquina.prototype.getRevision=function(cod_info_tarea){


    for (var i = 0; i < this._revisiones.length; i++) {


        if (this._tareas[i].getCodigoTarea()=== cod_info_tarea)
        {

            return this._tareas[i];
        }

    }

};
