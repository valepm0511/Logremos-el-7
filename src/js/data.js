window.data = {};

window.data.register = (makeMail, makePassword) => {
	firebase.auth().createUserWithEmailAndPassword(makeMail, makePassword).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('errorCode', errorCode, 'errorMessage', errorMessage);
	});
};

function loginFace(){
	const provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({
		'display':'popup'
	});
	firebase.auth().signInWithPopup(provider)
	.then(() => {
		console.log("login con facebook");
	})
	.catch((error) => {
		console.log("error de firebase > "+error.code);
		console.log("error de firebase, mensaje > "+error.message);
	});
}
