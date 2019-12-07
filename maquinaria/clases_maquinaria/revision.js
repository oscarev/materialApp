

function Revision(cod, cod_maq, f_rev, f_prox_rev, periodo, tipo,f_realizacion,responsable,empresa){

      this._cod= cod;
      this.cod_maq = cod_maq;
      this.f_rev = f_rev;
      this.f_prox_rev= f_prox_rev;
      this.periodo=periodo;
      this.tipo =tipo;
      this.responsable=responsable;

    if(arguments.length==9){

      this.f_realizacion=f_realizacion;
      this.empresa=empresa;

    }else{
      //si no se incluyen estos parametros se les asigna una cadena vacia
      this.f_realizacion='';
      this.empresa='';

    }


}


Revision.prototype.getCod=function(){


    return this._cod;

};

Revision.prototype.getCod_maq=function(){


    return this.cod_maq;

};

Revision.prototype.getF_rev=function(){


    return this.f_rev;

};

Revision.prototype.getF_prox_rev=function(){


    return this.f_prox_rev;

};

Revision.prototype.getPeriodo=function(){


    return this.periodo;

};

Revision.prototype.getTipo=function(){


    return this.tipo;

};

Revision.prototype.getF_realizacion=function(){


    return this.f_realizacion;

};

Revision.prototype.setF_realizacion=function(f_realizacion){


   this.f_realizacion=f_realizacion;

};

Revision.prototype.getResponsable=function(){


    return this.responsable;

};

Revision.prototype.getEmpresa=function(){


    return this.empresa;

};
