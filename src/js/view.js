window.view = {};


// función de escritura del muro
window.view.wall = () => {
  var element = document.getElementById('counter');
  element.classList.remove('containerLogin');
  const wallMessage = window.controller.wall();

  let htmlWall =
    `<div class="container-fluid">
      <div class="row">
       <!--sidebar-->
        <div class="col-lg-3 navbar-dark bg-dark sidebar sidebar-sticky imgFondo">
          <nav class="navbar navbar-expand-lg flex-lg-column">
             <a class="navbar-brand" href="#">Menú</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav flex-lg-column navStyle">
                <button type"button" class="btnNav text-left col-12" onclick="window.view.wall()">
                <i class="fas fa-home pr-3 py-3"></i>Home</button>
                <button type"button" class="btnNav text-left col-12">
                <i class="fas fa-user pr-3 py-3"></i> Perfil</button>
                <button type"button" class="btnNav text-left col-12" onclick="window.view.infoEdit()">
                <i class="fas fa-pencil-alt pr-3 py-3"></i>Completar Perfil</button>
                <button type"button" class="btnNav text-left col-12" onclick="window.data.logOut()">
                <i class="fas fa-sign-out-alt pr-3 py-3"></i>Cerrar Sesión</button>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-lg-9 containerWall">
          <h1 class="titleWall text-center">Logremos el 7</h1>
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="float-left">
                  <img src="img/Avatar-facebook.png" alt="avatar" class="img-fluid imgAvatar ">
                </div>
              <div class="float-left ml-3">
              <p class="nameUser">${window.userData.displayName || window.userData.email}</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <textarea class="form-control" id="textareaMessageWall" rows="3" placeholder="Ingrese su comentario..."></textarea>
        </div>
        <button id="btnPublic" onclick="window.controller.publishMessage()" type="button" class="btn btn-primary float-right btnStyle">Publicar</button>`;

  wallMessage.then(messages => {
    messages.forEach(message => {
      const men = message.data();

      // formato fecha
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      let dateFormat = men.date.toDate();
      let date = dateFormat.toLocaleDateString('sp-GB', options);


      if (window.userData.email === men.email) {
        htmlWall +=
          `<div class="row">
            <div class="col-12">
              <div class="float-left">
                <img src="img/Avatar-facebook.png" alt="avatar" class="img-fluid imgAvatar ">
            </div>
                <div class="float-left ml-3">
                  <p class="nameUser">${men.name || men.email}</p>
                  <p class="datePost">${date} h</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <textarea disabled class="form-control able" id="${message.id}" rows="3">${men.message}</textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-3">
                <button type="button" class="btn btn-primary float-right mt-3 btnStyle" data-toggle="modal" data-target="#exampleModal" onclick="window.view.deleteMessage('${message.id}')">Eliminar</button>
                <div id="deleteBtnEdit">
                  <button id="btn${message.id}" type="button" class="btn btn-primary float-right mr-3 mt-3 btnStyle" onclick="window.controller.editMessage('${message.id}')">Editar</button>
                </div>
              </div>
            </div>
            <div class="h-0 " id="alert${message.id}">
                </div>`;
      } else {
        htmlWall +=
          `<div class="row">
          <div class="col-12">
            <div class="float-left">
              <img src="img/Avatar-facebook.png" alt="avatar" class="img-fluid imgAvatar">
            </div>
            <div class="float-left ml-3">
              <p class="nameUser">${men.name || men.email}</p>
              <p class="datePost">${date} h</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <textarea disabled class="form-control able" id="${message.id}" rows="3">${men.message}</textarea>
            </div>
        </div>`;
      };
    });

    let divWall = document.getElementById('counter');
    divWall.innerHTML = htmlWall +
      `</div>
     </div > `;
  });
};


// Escritura de html de crear cuenta
window.view.register = () => {
  let divRegister = document.getElementById('counter');
  divRegister.innerHTML =
    `< div class="container pt-5" >
          <h1 class="titleSize text-center pt-sm-2 pt-lg-5">Logremos el 7</h1>
          <h2 class="display-4 text-center text-white titleSizeCuenta">Crear Cuenta</h2>
          <div class="row justify-content-center pt-3 p-0">
            <div class="col-12 col-md-8 col-sm-12 col-lg-5">
              <form class="form-inline">
                <div class="col-12 col-md-12 mb-2">
                  <label class="sr-only" for="inlineFormInputGroupUsername2">Correo Electrónico</label>
                  <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fas fa-user"></i>
                      </div>
                    </div>
                    <input type="text" class="form-control" id="makeMail" placeholder="Correo Electrónico">
                </div>
                  </div>
                  <div class="col-12 col-md-12 mb-2">
                    <label class="sr-only" for="inlineFormInputGroupUsername2">Contraseña</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="fas fa-lock"></i>
                        </div>
                      </div>
                      <input type="password" class="form-control" id="makePassword" placeholder="Contraseña">
                  </div>
                    </div>
                    <div class="container">
                      <div class="row mt-2">
                        <div class="col-10 col-sm-6 col-md-7 col-lg-7 m-auto">
                          <button class="btn btn-primary mb-2 col-12 btn-style" id="makeBtn" type="button" onclick="window.controller.register()">Crear Cuenta</button>
                        </div>
                      </div>
                      <!-- <div class="row mt-2">
                        <div class="col-10 col-sm-6 col-md-7 col-lg-7 m-auto">
                          <button type="button" class="btn btn-primary mb-2 col-12 btn-style_g"><i class="fab fa-google-plus-square"></i> Sesión con Google+</button>
                        </div>
                      </div> -->
             </div>
           </form>
                  <!--<p class="text-center text-white mt-2 enlace_style"><a href="#">¿Olvidaste tu contraseña?</a></p> -->
         </div>
       </div>
            </div>`;
};


// función escritura de html para agregar datos de perfil
window.view.ingress = () => {
  document.getElementById('counter').className = 'containerLogin';
  let divIngress = document.getElementById('counter');
  divIngress.innerHTML =
    `<div class="container pt-5">
              <h1 class="titleSize text-center pt-sm-2 pt-lg-5">Logremos el 7</h1>
              <h2 class="text-center titleSizeCuenta">Iniciar Sesión</h2>
              <div class="row justify-content-center pt-3 p-0">
                <div class="col-12 col-md-8 col-sm-12 col-lg-5">
                  <form class="form-inline">
                    <div class="col-12 col-md-12 mb-2">
                      <label class="sr-only" for="inlineFormInputGroupUsername2">Correo Electrónico</label>
                      <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fas fa-user"></i>
                          </div>
                        </div>
                        <input type="text" class="form-control" id="connectMail" placeholder="Correo Electrónico">
            </div>
                      </div>
                      <div class="col-12 col-md-12 mb-2">
                        <label class="sr-only" for="inlineFormInputGroupUsername2">Contraseña</label>
                        <div class="input-group mb-2 mr-sm-2">
                          <div class="input-group-prepend">
                            <div class="input-group-text">
                              <i class="fas fa-lock"></i>
                            </div>
                          </div>
                          <input type="password" class="form-control" id="connectPassword" placeholder="Contraseña">
            </div>
                        </div>
                        <div class="container">
                          <div class="row mt-2">
                            <div class="col-10 col-sm-6 col-md-7 col-lg-7 m-auto">
                              <button class="btn btn-primary mb-2 col-12 btn-style" type="button" id="connectBtn" onclick="window.controller.ingress()">Iniciar Sesión</button>
                            </div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-10 col-sm-6 col-md-7 col-lg-7 m-auto">
                              <button type="button" class="btn btn-primary mb-2 col-12 btn-style_fb" onclick="window.data.loginFace()">
                                <i class="fab fa-facebook-square"></i>Facebook</button>
                            </div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-10 col-sm-6 col-md-7 col-lg-7 m-auto">
                              <button type="button" class="btn btn-primary mb-2 col-12 btn-style_g" onclick="window.data.loginGoogle()">
                                <i class="fab fa-google-plus-square"></i>Google+</button>
                            </div>
                          </div>
                        </div>
                        <div class="container">
                          <div class="row justify-content-center">
                            <div class="col-6 text-center m-auto">
                              <button class="btnCreate pb-2 mt-3" onclick="window.view.register()">
                                <p>Crear Cuenta</p>
                              </button>
                            </div>
                          </div>
                        </div>
  
            </form>
                      <!--<p class="text-center text-white mt-2 enlace_style"><a href="#">¿Olvidaste tu contraseña?</a></p> -->
          </div>
        </div>
                </div>
              </div>`;
};


// función escritura de html para agregar datos de perfil
window.view.infoEdit = () => {
  let divPerfil = document.getElementById('counter');
  divPerfil.innerHTML = `<div class="container-fluid">
  <div class="row">
    <!--sidebar-->
    <div class="col-lg-3 navbar-dark bg-dark sidebar sidebar-sticky imgFondo">
      <nav class="navbar navbar-expand-lg flex-lg-column">
        <a class="navbar-brand" href="#">Menú</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav flex-lg-column navStyle">
                <button type"button" class="btnNav text-left col-12" onclick="window.view.wall()">
                <i class="fas fa-home pr-3 py-3"></i>Home</button>
                <button type"button" class="btnNav text-left col-12">
                <i class="fas fa-user pr-3 py-3"></i> Perfil</button>
                <button type"button" class="btnNav text-left col-12" onclick="window.view.infoEdit()">
                <i class="fas fa-pencil-alt pr-3 py-3"></i>Completar Perfil</button>
                <button type"button" class="btnNav text-left col-12" onclick="window.data.logOut()">
                <i class="fas fa-sign-out-alt pr-3 py-3"></i>Cerrar Sesión</button>
              </div>
            </div>
            </nav>
          </div>
          <!--container perfil-->
          <div class="col-lg-9 containerWall">
            <h1 class="titleWall text-center">Logremos el 7</h1>
            <h1 class="display-4 text-center text-white titlePerfil">Información Personal</h1>
            <div class="row justify-content-center">
              <div class="col-md-8 col-12">
                <!--Informacion personal-->
                <form>
                  <div class="form-group">
                    <label class="text-white">Nombre:</label>
                    <input type="text" class="form-control" id="nameUserEdit" placeholder="Nombre...">
                  </div>
                  <div class="form-group">
                    <label class="text-white">Email:</label>
                    <input type="email" class="form-control" id="emailUserEdit" placeholder="Email...">
                  </div>
                  <div class="form-group">
                    <label class="text-white">Edad:</label>
                    <input type="number" class="form-control col-3 col-md-2" id="ageUserEdit" placeholder="Edad...">
                  </div>
                  <div class="form-group">
                    <label class="text-white">Foto:</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1">
                  </div>
                </form>
              </div>
            </div>
            <!-- textarea -->
            <div class="row justify-content-center">
              <div class="col-md-8 col-12">
                <form>
                  <div class="form-group">
                    <label class="text-white">Escribe un reseña</label>
                    <textarea class="form-control" id="biographyUserEdit" rows="3"></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-md-8 col-12">
                <label class="display-4 text-center text-white titlePerfil">Materias de Interes:</label>
                <div class="row">
                  <div class="col-md-6 col-12">
                    <form>
                      <div class="form-group">
                        <div class="checkbox">
                          <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Matemáticas</span></label>
                        </div>
                        <div class="checkbox">
                          <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Física</span></label>
                        </div>
                        <div class="checkbox disabled">
                          <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Biología</span></label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-6 col-12">
                   <form>
                    <div class="form-group">
                     <div class="checkbox">
                      <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Lenguaje</span></label>
                    </div>
                    <div class="checkbox">
                      <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Química</span></label>
                    </div>
                    <div class="checkbox disabled">
                      <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Ingles</span></label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 col-12">
               <label class="display-4 text-white ">Nivel Educacional:</label>
               <form>
                <div class="form-group">
                  <div class="checkbox">
                    <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Básica</span></label>
                  </div>
                  <div class="checkbox">
                    <label><input type="checkbox" class="mr-2" value=""><span class="text-white">Medio</span></label>
                  </div>
                  <div class="checkbox disabled">
                    <label><input type="checkbox" class="mr-2" value="" ><span class="text-white">Superior</span></label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-5">
              <button type="button" class="btn btn-primary" onclick="window.data.infoEdit()">Guardar Información</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
};


// función para eliminar mensajes y resfrescar muro 
window.view.deleteMessage = (id) => {
  let divDelete = document.getElementById(`alert${id}`);
  divDelete.innerHTML = `
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
         <h5 class="text-center" id="exampleModalLabel">Alerta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-center">
        ¿Quiere eliminar este mensaje?
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-primary" onclick="window.data.deleteMessage('${id}')" data-dismiss="modal">Si</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>`;
};
