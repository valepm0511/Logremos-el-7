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
  firebase.auth().signInWithPopup(provider)
    .then(() => {
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
  firebase.auth().signInWithPopup(provider)
    .then(() => {
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
    .catch((error) => {
      console.error('it was not possible to close session', error);
    });
};


// función para guardar los documentos/mensajes desde firestore
window.data.readWall = () => {
  const firestore = firebase.firestore();
  const settings = { /* your settings... */
    timestampsInSnapshots: true
  };
  firestore.settings(settings);
  return firestore.collection('wall').orderBy('date', 'desc').limit(20).get().then((wallMessages) => {
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
    const editRef = firestore.collection('wall').doc(id);

    const newMessage = document.getElementById(id).value;

    return editRef.update({
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


// funcion para volver a leer datos y sobreescribirlos en identificador 
window.data.refreshData = () => {
  return firebase.auth().onAuthStateChanged((user) => {
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
      return user;
    }
  });
};


// función para ingresar informacion de perfil de usuario
window.data.infoEdit = () => {
  // para agregar nombre a Authentication
  let nameUserEdit = document.getElementById('nameUserEdit').value;
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: nameUserEdit,
  }).then(() => {
    window.data.refreshData();
  }).catch((error) => {
  });

  // para agregar email a Authentication
  let emailUserEdit = document.getElementById('emailUserEdit').value;
  var user = firebase.auth().currentUser;
  user.updateEmail(emailUserEdit).then(() => {
    window.data.refreshData();
  }).catch((error) => {
  });
};


// función para guardar datos de user en collección
window.data.addUser = () => {
  let nameUserEdit = document.getElementById('nameUserEdit').value;
  let emailUserEdit = document.getElementById('emailUserEdit').value;
  let ageUserEdit = document.getElementById('ageUserEdit').value;
  let biographyUserEdit = document.getElementById('biographyUserEdit').value;

  let dataUserProfile = {
    name: nameUserEdit,
    email: emailUserEdit,
    age: ageUserEdit,
    biography: biographyUserEdit,
    photoURL: window.userData.photoURL,
    uid: window.userData.uid
  };

  const firestore = firebase.firestore();
  firestore.collection('profile').doc(emailUserEdit).set(dataUserProfile);
  window.view.showProfile(dataUserProfile);
};


// función para obtener datos de colección user
window.data.dataCollection = () => {
  const firestore = firebase.firestore();

  var docRef = firestore.collection('profile').doc(window.userData.email);

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data());
      window.view.showProfile(doc.data());
    } else {
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};

// función que agrega likes
window.data.counterLike = (id, oldLike) => {
  const firestore = firebase.firestore();
  const likeRef = firestore.collection('wall').doc(id);

  return likeRef.update({
    like: parseInt(oldLike) + 1
  })
    .then(() => {
      window.view.wall();
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};
