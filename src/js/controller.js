window.controller = {};


// función para validar mail
window.controller.validateLogin = (email, password) => {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  // según campos vacíos
  if (email.length === 0 || password.length === 0) {
    return {
      valid: false,
      message: 'No debe dejar campos vacíos'
    };
    // según formato de email
  } else if ((emailRegex.test(email)) === false) {
    return {
      valid: false,
      message: 'Debe ingresar un mail valido'
    };
    // según password mayor a 6 caracteres
  } else if (password.length < 6) {
    return {
      valid: false,
      message: 'La contraseña debe contener minimo 6 caracteres'
    };
  };
  return {
    valid: true,
    message: ''
  };
};


// función llegada mail y password, valida y registra o envia mensaje 
window.controller.register = () => {
  let makeMail = document.getElementById('makeMail').value;
  let makePassword = document.getElementById('makePassword').value;

  // llama a función de validado mail y password
  const isValid = window.controller.validateLogin(makeMail, makePassword);

  // llama a función de registro en firebase
  if (isValid.valid) {
    window.data.register(makeMail, makePassword);
    alert('Cuenta creada');
  } else {
    alert(isValid.message);
  }
};

// función para ver actividad de usuario, capturar datos de usuario y enviar a muro o login
window.controller.activeUser = () => {
  return firebase.auth().onAuthStateChanged((user) => {
    // si hay usuario lee datos
    if (user) {
      window.userData = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData
      };
      // cuando hay usuario envia a muro
      window.view.wall();
      return user;
    } else {
      // no hay usuario y envia a login
      window.view.ingress();
    }
  });
};


// función para hacer login
window.controller.ingress = () => {
  let connectMail = document.getElementById('connectMail').value;
  let connectPassword = document.getElementById('connectPassword').value;
  console.log(connectMail, connectPassword);

  // llama a ingress en firebase
  window.data.ingress(connectMail, connectPassword);
};


// función que comunica escritura con data  
window.controller.wall = () => {
  return window.data.readWall();
};


// función carga manada a analizar si usuario esta activo
window.onload = () => {
  window.controller.activeUser();
};


// función que lee mensaje de textarea y crea objeto de data 
window.controller.publishMessage = () => {
  const textareaMessageWall = document.getElementById('textareaMessageWall').value;

  const dataWall = {
    date: new Date(),
    email: window.userData.email,
    like: 0,
    message: textareaMessageWall,
    name: window.userData.displayName,
    photoURL: window.userData.photoURL,
    uid: window.userData.uid
  };

  // función que cuando obtenga respuesta de datos de muro vuelve a escribir el muro
  window.data.writeWall(dataWall).then(() => {
    window.view.wall();
  });
};


// función para eliminar mensajes y resfrescar muro 
window.controller.deleteMessage = (id) => {
  window.data.deleteMessage(id);
};


// función para editar mensajes
window.controller.editMessage = (id) => {
  window.data.editMessage(id);
};