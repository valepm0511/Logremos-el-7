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


// función para ingresar informacion de perfil de usuario
window.data.infoEdit = () => {
  const firestore = firebase.firestore();

  let nameUserEdit = document.getElementById('nameUserEdit').value;
  let emailUserEdit = document.getElementById('emailUserEdit').value;
  let ageUserEdit = document.getElementById('ageUserEdit').value;
  let biographyUserEdit = document.getElementById('biographyUserEdit').value;

  firestore.collection('users').add({
    name: nameUserEdit,
    email: emailUserEdit,
    age: ageUserEdit,
    biography: biographyUserEdit
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      window.idUsers = docRef.id;
      console.log(window.idUsers);

      document.getElementById('nameUserEdit').value = '';
      document.getElementById('emailUserEdit').value = '';
      document.getElementById('ageUserEdit').value = '';
      document.getElementById('biographyUserEdit').value = '';
      var docRef = firestore.collection('users').doc(docRef.id);

      docRef.get().then((doc) => {
        if (doc.exists) {
          let infoEditUser = document.getElementById('infoEditUser');
          infoEditUser.innerHTML = `
        <p class="text-center infoPerfil mt-3">${doc.data().name}</p>
        <p class="text-center infoPerfil">${doc.data().age}</p>
        <p class="text-center infoPerfil">${doc.data().email}</p>
        <p class="text-center text-white">${doc.data().biography}</p>`;
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};