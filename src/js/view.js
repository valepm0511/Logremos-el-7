window.view = {};


// función de escritura del muro
window.view.wall = () => {
  document.getElementById('counter').className = 'containerWall';
  const wallMessage = window.controller.wall();

  let htmlWall =
    `<!--sidebar-->
  <div class="col-lg-3 navbar-dark bg-dark sidebar sidebar-sticky">
    <nav class="navbar navbar-expand-lg flex-lg-column">
      <a class="navbar-brand" href="#">Menú</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav flex-lg-column navStyle">
          <a class="nav-item nav-link  active" href="#">
            <i class="fas fa-home pr-3"></i>Home</a>
          <a class="nav-item nav-link" href="#">
            <i class="fas fa-user pr-3"></i>Perfil</a>
          <a class="nav-item nav-link" href="#">
            <i class="fas fa-pencil-alt pr-3"></i>Completar Perfil</a>
          <a class="nav-item nav-link" href="#">
            <i class="fas fa-users pr-3"></i>Amigos</a>
        </div>
      </div>
    </nav>
  </div>
  <div class="col-lg-9">
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
        <button onclick="window.controller.publishMessage()" type="button" class="btn btn-primary float-right">Publicar</button>
      </div>
    </div>
  </div>`;

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


      // console.info('id', message.id);

      htmlWall +=
      `<div class="col-lg-9">
        <div class="row">
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
            <p class="textPost">${men.message}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mb-3">
            <button type="button" class="btn btn-primary float-right">Eliminar</button>
            <button type="button" class="btn btn-primary float-right mr-3">Editar</button>
          </div>
        </div>
      </div >`;
    });

    let divWall = document.getElementById('counter');
    divWall.innerHTML = htmlWall;
  });
};


// Escritura de html de crear cuenta
window.view.register = () => {
  let divRegister = document.getElementById('counter');
  divRegister.innerHTML =
    `<div class="container pt-5">
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


// Escritura de html de conectar
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
