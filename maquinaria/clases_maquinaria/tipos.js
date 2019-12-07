function Tipo(tipe,cod_tipo){

        this._cod_tipo = cod_tipo;
        this.tipe = tipe;

}


Tipo.prototype.getCod_per=function(){


    return this._cod_per;

};

Tipo.prototype.getTipe=function(){


    return this.tipe;

};
