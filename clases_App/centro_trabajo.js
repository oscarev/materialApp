

function Centro(cod_centro,nombre_centro){

        this._cod_centro = cod_centro;
        this.nombre_centro = nombre_centro;

}


Centro.prototype.getCod_centro=function(){


    return this._cod_centro;

};

Centro.prototype.getNombreCentro=function(){


    return this.nombre_centro;

};
