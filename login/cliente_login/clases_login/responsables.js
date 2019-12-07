function Responsable(cod_resp,resp){


//HERENCIA DEL OBJETO USUARIO
  Usuario.call(this,'idUsuario','nombreUsuario','email','password',cod_resp);


  this.resp = resp;


}

//DETERMINAR LA HERENCIA
Responsable.prototype = new Usuario();
Responsable.prototype.constructor = Responsable;


Responsable.prototype.getCod_resp=function(){


    return this._cod_resp;

};

Responsable.prototype.getResponsable=function(){


    return this.resp;

};

Responsable.prototype.setIdUsuario=function(){

    return this.idUsuario;

}

Responsable.prototype.setNombreUsuario=function(nombreUsuario){

    this.nombreUsuario=nombreUsuario;

}

Responsable.prototype.setEmail=function(email){

    this.email=email;

}

Responsable.prototype.setPassword=function(pasword){

   this.password=password;

}

Responsable.prototype.setCodResp=function(codResp){

   this.codResp=codResp;

}
