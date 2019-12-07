

function Periodo(per,cod_per){

        this._cod_per = cod_per;
        this.per = per;

}


Periodo.prototype.getCod_per=function(){


    return this._cod_per;

};

Periodo.prototype.getPer=function(){


    return this.per;

};
