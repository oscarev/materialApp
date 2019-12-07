<?php

    // Recuperamos la información de la sesión
    session_start();
    // Y comprobamos que el usuario se haya autentificado
    if (!isset($_SESSION['usuario'])) {

      header("Location: ../../login.html");
      die();

    }

    //Comprobamos si esta definida la sesión 'tiempo'.
    if(isset($_SESSION['tiempo']) ) {

        //Tiempo en segundos para dar vida a la sesión.
        $inactivo = 1200;//20min en este caso.

        //Calculamos tiempo de vida inactivo.
        $vida_session = time() - $_SESSION['tiempo'];

            //Compraración para redirigir página, si la vida de sesión sea mayor a el tiempo insertado en inactivo.
            if($vida_session > $inactivo)
            {


                $_SESSION = array();

            // Si se desea destruir la sesión completamente, borre también la cookie de sesión.
            // Nota: ¡Esto destruirá la sesión, y no la información de la sesión!
            if (ini_get("session.use_cookies")) {
              $params = session_get_cookie_params();
              setcookie(session_name(), '', time() - 12000,
                  $params["path"], $params["domain"],
                  $params["secure"], $params["httponly"]
              );
            }


              //Removemos sesión.
              session_unset();

              // Finalmente, destruir la sesión.
              session_destroy();


              //Redirigimos pagina.
                header("Location: ../../login.html");


                exit();
            }
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Aplicacion PRL HTML5</title>
  <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link href="https://fonts.googleapis.com/css?family=Poppins|Roboto|Raleway|PT+Sans|Asap|Abril+Fatface|Noto+Sans+JP|MuseoSans" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="../estilos_maquinaria/estilos_maquinaria.css"></link>
  <link rel="stylesheet" type="text/css" href="estilos_ferreteria/estilos_ferreteria.css"></link>



  <script type="text/javascript" src="../../clases_App/centro_trabajo.js"></script>
  <script type="text/javascript" src="../../login/cliente_login/clases_login/usuario.js"></script>

  <script type="text/javascript" src="../clases_maquinaria/maquina.js"></script>



  <!--LIBRERIA PARA CREAR QR -->
  <script type="text/javascript" src="recursos/qrcode.min.js"></script>
  <!--LIBRERIA PARA EL LECTOR QR (copiada directamente del enlace web: https://rawgit.com/schmich/instascan-builds/master/instascan.min.js,
  el descargable da error)-->
  <script src="recursos/instascan.min.js"></script>

  <script>

    //CREAR CENTRO DE TRABAJO
    var $centro=new Centro(2);

  </script>

  <script type="text/javascript" src="../cliente_maquinaria/funciones_maquinaria.js"></script>
  <script type="text/javascript" src="../cliente_maquinaria/maquinaria_ajax/ajaxMaquinaria.js"></script>


  <script type="text/javascript" src="clases_ferreteria/equipo_ferreteria.js"></script>
  <script type="text/javascript" src="clases_ferreteria/revision_ferreteria.js"></script>
  <script type="text/javascript" src="cliente_ferreteria/funciones_ferreteria.js"></script>
  <script type="text/javascript" src="cliente_ferreteria/ferreteria.js"></script>
  <script type="text/javascript" src="cliente_ferreteria/ferreteria_ajax/ajaxFerreteria.js"></script>

</head>

<body>

  <main>

        <header>

                <nav class="nav_horizontal">

                    <a id='logo' href="../../login.html"><img class="" src="../imagenes_maquinaria/Imagen1.png" alt="Logotipo de HTML5" width="70"></a>

                    <div class="hamburger navbar-brand">

                        <div class="hamburger-inner"></div>

                    </div>

                    <ul>

                        <li>
                            <a href="../oficina/maquinaria_oficina.php">Oficina</a>
                        </li>

                        <li>
                            <a href="../taller/maquinaria_taller.php">Taller</a>
                        </li>

                        <li>
                            <a href="#">Ferreteria</a>
                        </li>

                        <li>
                            <a href="../mantenimiento/maquinaria_mantenimiento.php">Centro Mant.</a>
                        </li>


                    </ul>
                    <span id='logoSesion'><i class="material-icons" style="color:orange;cursor:pointer;">&#xe7fd;</i></span>

                </nav>


                <nav class="nav_vertical">

                  <ul>

                      <li>
                          <a href="../oficina/maquinaria_oficina.php">Oficina</a>
                      </li>

                      <li>
                          <a href="../taller/maquinaria_taller.php">Taller</a>
                      </li>

                      <li>
                          <a href="#">Ferreteria</a>
                      </li>

                      <li>
                          <a href="../mantenimiento/maquinaria_mantenimiento.php">Centro Mant.</a>
                      </li>


                  </ul>

                </nav>

        </header>


        <aside>

            <div><i class="material-icons" style="font-size:13px;">close</i></div>
            <div></div>
            <div></div>

            <a ref='#'>cerrar sesion</a>

        </aside>


        <section>


                <article>

                      <form id="nuevoQr" enctype="multipart/form-data">

                              <input type="text" name="codigoE" id="codigoE" placeholder="Codigo equipo..."/>


                              <div id='datosEquipo'>

                                      <select name="tipoEquipo" id="tipoEquipo">

                                                      <option value="">Equipo...</option>
                                                      <option value="escalera">escalera</option>
                                                      <option value="linea">linea de vida</option>
                                                      <option value="tractel">tractel</option>
                                                      <option value="retractil">retractil</option>

                                        </select>

                                        <div id='marcaEquipo'>

                                            <input type="text" name="marcaE" id="marcaE" placeholder="Marca..."/>
                                            <input type="text" name="modeloE" id="modeloE" placeholder="Modelo..."/>

                                       </div>

                                        <span id='f_fabricacion'>
                                              <input name="fabricacion" type="date"/>
                                        </span>

                                        <span id='caducidad'>
                                              <input name="caducidad" type="date"/>
                                        </span>

                                        <span id='revisionE'>
                                              <input name="revisionE" type="date"/>
                                        </span>

                                        <span id='prox_revisionE'>
                                              <input name="prox_revisionE" type="date"/>
                                        </span>

                                        <span id='archivoUp'>

                                          <input type="file" name="archivoUp">

                                        </span>

                                      <div id='confirmarQR'>

                                        <input type="button" id='confirmar' name="confirmar" value="Confirmar"/>
                                        <input type="reset" id='reset' name="reset" value="Reset"/>

                                      </div>

                              </div>


                              <div id='botonesQr'>

                                  <span id='newQr'>Nuevo</span>
                                  <span id='buscarQr'>Buscar Qr</span>
                                  <span id='mostrarEq'>Mostrar Eq.</span>

                              </div>

                        </form>

                          <div id="qrcode">

                          </div>

                          <div id="imp">

                            <i class="material-icons">&#xe8ad;</i>

                          </div>

                          <div id="camaraBtn">

                              <i class="fas">&#xf030;</i>

                          </div>

                </article>

                    <div id="equipo">

                      <i class="material-icons">close</i>

                          <div id="imgEquipo"></div>

                          <span id='idEquipo'></span>

                          <div id="marca">

                              <span></span>
                              <span></span>

                          </div>

                          <div id="fabricacion" class='datos'>

                              <span>Fabricacion:</span>
                              <span>Caducidad:</span>

                          </div>

                          <div id="revs" class='datos'>

                              <span>Revisión:</span>
                              <span>Próxima:</span>

                          </div>

                          <form id="nuevaRevisionEquipo">

                              <input type="button" id='revisionEquipo' name="revisionEquipo" value="Revision"/>
                              <input name="fechaNueva" type="date"/>

                          </form>

                    </div>

                    <div id="cam">

                        <i class="material-icons">close</i>
                        <video id="preview"><i class="material-icons">close</i></video>
                        <i class='fas fa-circle' style='font-size:18px;color:red'></i>

                    </div>

                    <div id="archivoEquipo">

                        <iframe id="inlineFrameExample">

                        </iframe>

                    </div>


            </section>


        <footer>


        </footer>

    </main>

</body>



</html>
