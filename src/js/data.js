window.data = {};

window.data.register = (makeMail, makePassword) => {
  firebase.auth().createUserWithEmailAndPassword(makeMail, makePassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};

window.data.ingress = () => {
  let connectMail = document.getElementById('connectMail').value;
  let connectPassword = document.getElementById('connectPassword').value;
  firebase.auth().signInWithEmailAndPassword(connectMail, connectPassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};

window.data.observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('activo');

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      console.log(user);
    } else {
      console.log('no activo');
    }
  });
};
window.data.observer();