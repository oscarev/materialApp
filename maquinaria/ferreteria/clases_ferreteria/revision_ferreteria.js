

function RevisionFerreteria(id_rev, cod_equipo, f_rev_eq, f_prox_rev_eq, f_realizacion_eq){

      this._id_rev= id_rev;
      this._cod_equipo= cod_equipo;
      this._f_rev_eq = f_rev_eq;
      this._f_prox_rev_eq= f_prox_rev_eq;

    if(arguments.length==5){

      this.f_realizacion_eq=f_realizacion_eq;

    }else{
      //si no se incluyen estos parametros se les asigna una cadena vacia
      this.f_realizacion_eq='';

    }


}

RevisionFerreteria.prototype.getCod=function(){


    return this._id_rev;

}

RevisionFerreteria.prototype.getCod_equipo=function(){


    return this._cod_equipo;

}

RevisionFerreteria.prototype.getF_rev_eq=function(){


    return this._f_rev_eq;

}

RevisionFerreteria.prototype.getF_prox_rev_eq=function(){


    return this._f_prox_rev_eq;

}


RevisionFerreteria.prototype.getF_realizacion_eq=function(){


    return this.f_realizacion_eq;

}
