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


// función para conectar con facebook
window.data.loginFace = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  let status;
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      status = 'activado desdes facebook';
      console.log(status);
    })
    .catch((error) => {
      console.log('error de firebase > ' + error.code);
      console.log('error de firebase, mensaje > ' + error.message);
    });
};

// funcion para conectar con google

window.data.loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  let status;
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      status = 'activado desde google';
      console.log(status);
    }).catch(() => {
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

window.data.readWall = () => {
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection('wall').get().then((wallMessages) => {
    return wallMessages;
  });
};


window.data.writeWall = (dataWall) => {
  const firestore = firebase.firestore();
  return firestore.collection('wall').doc().set(dataWall).then(() => {
    console.log('Document successfully written!');
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
};
