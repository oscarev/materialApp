
function Usuario(idUsuario,nombreUsuario,email,password,codResp){

  if(arguments.length===2){

    this.nombreUsuario=arguments[0];
    this.password=arguments[1];

  }else{

    this.idUsuario=idUsuario;
    this.nombreUsuario=nombreUsuario;
    this.email=email;
    this.password=password;
    this.codResp=codResp;

  }

};


Usuario.prototype.getIdUsuario=function(){

    return this.idUsuario;

}

Usuario.prototype.getNombreUsuario=function(){

   return this.nombreUsuario;

}

Usuario.prototype.getEmail=function(){

    return this.email;

}

Usuario.prototype.getPassword=function(){

   return this.password;

}

Usuario.prototype.getCodResp=function(){

    return this.codResp;

}
