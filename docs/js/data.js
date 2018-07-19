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

// // google
// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }


// función para cerrar sesión
window.data.logOut = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch(() => {
    });
};


// función para guardar los documentos/mensajes desde firestore
window.data.readWall = () => {
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection('wall').get().then((wallMessages) => {
    return wallMessages;
  });
};


// función para escribir los mensajes desde firestore en el muro
window.data.writeWall = (dataWall) => {
  const firestore = firebase.firestore();
  return firestore.collection('wall').add(dataWall).then(() => {
    document.getElementById('textareaMessageWall').value = '';
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
};


// función para borrar mensajes 
window.data.deleteMessage = (id) => {
  const firestore = firebase.firestore();
  firestore.collection('wall').doc(id).delete().then(() => {
    window.view.wall();
  }).catch((error) => {
    console.error('Error removing document: ', error);
  });
};


// función para editar comentarios 
window.data.editMessage = (id) => {
  document.getElementById(id).disabled = false;
  const btnSaveEdit = document.getElementById('btn' + id);
  btnSaveEdit.innerHTML = 'Guardar';

  btnSaveEdit.onclick = () => {
    const firestore = firebase.firestore();
    const washingtonRef = firestore.collection('wall').doc(id);

    const newMessage = document.getElementById(id).value;

    return washingtonRef.update({
      message: newMessage,
      date: new Date()
    })
      .then(() => {
        window.view.wall();
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };
};