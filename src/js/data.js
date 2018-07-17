window.data = {};

// función para registrar usuario con mail y password
window.data.register = (makeMail, makePassword) => {
  firebase.auth().createUserWithEmailAndPassword(makeMail, makePassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};


// función para ingresar con mail y password
window.data.ingress = (connectMail, connectPassword) => {
  firebase.auth().signInWithEmailAndPassword(connectMail, connectPassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};


// función para observar usuario y ver status
window.data.activeUser = () => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userData = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData
      };
      console.info('--->', userData);
      window.view.wall(userData);
      return user;
    } else {
      console.log('sin usuario activo');
      window.view.ingress();
    }
  });
};


// función para conectar con facebook
window.data.loginFace = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('login con facebook');
    })
    .catch((error) => {
      console.log('error de firebase > ' + error.code);
      console.log('error de firebase, mensaje > ' + error.message);
    });
};


// función para cerrar sesión
window.data.logOut = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch(() => {
    });
};