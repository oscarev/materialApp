function Tarea(codigo_info_tara,codigo_maq,nombre_responsable,descripcion_tarea,periodo_tarea){

        this._cod_info_tarea = codigo_info_tara;
        this.codigo_maq = codigo_maq;
        this.nombre_responsable=nombre_responsable;
        this.descripcion_tarea=descripcion_tarea;
        this.periodo_tarea=periodo_tarea;


}


Tarea.prototype.getCodInfoTarea=function(){


    return this._cod_info_tarea;

};

Tarea.prototype.getCodigoMaq=function(){


    return this.codigo_maq;

};

Tarea.prototype.getNombreResponsable=function(){


    return this.nombre_responsable;

};

Tarea.prototype.getDescripcionTarea=function(){


    return this.descripcion_tarea;

};

Tarea.prototype.getPeriodoTarea=function(){


    return this.periodo_tarea;

};
