firebase.initializeApp({
	apiKey: 'AIzaSyD2QGOd7QnQTwykGV3RXx5H1DLULoPQB7M',
	authDomain: 'redsociallaboratoria.firebaseapp.com',
	projectId: 'redsociallaboratoria'
});

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore();

// const infoEdit = () => {
// 	let nameUserEdit = document.getElementById('nameUserEdit').value;
// 	let emailUserEdit = document.getElementById('emailUserEdit').value;
// 	let ageUserEdit = document.getElementById('ageUserEdit').value;
// 	let biographyUserEdit = document.getElementById('biographyUserEdit').value;

// 	firestore.collection("users").add({
// 		name: nameUserEdit,
// 		email: emailUserEdit,
// 		age: ageUserEdit,
// 		biography: biographyUserEdit
// 	})
// 	.then(function(docRef) {
// 		console.log("Document written with ID: ", docRef.id);
// 		window.idUsers = docRef.id;
// 		console.log(window.idUsers);

// 		document.getElementById('nameUserEdit').value = '';
// 		document.getElementById('emailUserEdit').value = '';
// 		document.getElementById('ageUserEdit').value = '';
// 		document.getElementById('biographyUserEdit').value = '';
// 		var docRef = firestore.collection("users").doc(docRef.id);

// 		docRef.get().then(function(doc) {
// 			if (doc.exists) {
// 				let infoEditUser = document.getElementById('infoEditUser');
// 				infoEditUser.innerHTML = `
// 				<p class="text-center infoPerfil mt-3">${doc.data().name}</p>
// 				<p class="text-center infoPerfil">${doc.data().age}</p>
// 				<p class="text-center infoPerfil">${doc.data().email}</p>
// 				<p class="text-center text-white">${doc.data().biography}</p>
// 				`
// 			} else {
// 				console.log("No such document!");
// 			}
// 		}).catch(function(error) {
// 			console.log("Error getting document:", error);
// 		});
// 	})
// 	.catch(function(error) {
// 		console.error("Error adding document: ", error);
// 	});
// }
