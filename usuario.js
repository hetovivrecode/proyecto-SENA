var db = firebase.firestore();

//-------monstrar formulario

function mostrar(dato) {
	switch(dato) {
		case "ver":
			document.getElementById('form').style.display = "block";
			document.getElementById('visualizar').style.display = "none";
			break;
		case "ocultar":
			document.getElementById('form').style.display = "none";
			document.getElementById('visualizar').style.display = "block";
			document.getElementById('botong').style.display = "block";
			document.getElementById('botone').style.display = "none";
			break;
	}
}

//------------agregar un nuevo usuario
function agregar() {

	var claveu = document.getElementById('clave').value;
	var emailu = document.getElementById('email').value;
	var nombreu = document.getElementById('nombre').value;
	var rolu = document.getElementById('rol').value;
	var telefonou = document.getElementById('rol').value;
	var idu = "";
	
	firebase.auth().createUserWithEmailAndPassword(emailu, claveu)
	  .then((userCredential) => {
	    // Signed in
	    var user = userCredential.user;
	    uid = user.uid;	
	     //----------crear usuario BD
	     
	     db.collection("usuario").doc(uid).set({

			    clave: claveu,
				email: emailu,
				id: idu,
				nombre: nombreu,
				rol: rolu,
				telefono: telefonou,

			})
			.then(() => {
			    console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing document: ", error);
			});
	  
		db.collection("usuario").add({

			clave: claveu,
			email: emailu,
			id: idu,
			nombre: nombreu,
			rol: rolu,
			telefono: telefonou,

				})
				.then((docRef) => {
					 alert('El usuario se guardo correctamente');
				    console.log("Document written with ID: ", docRef.id);
				})
				.catch((error) => {
					alert('Error guardar base de datos');
				    console.error("Error adding document: ", error);
				});
				
				document.getElementById('form').style.display = "none";
				document.getElementById('visualizar').style.display = "block";
				
				document.getElementById('nombre').value = "";
				document.getElementById('email').value ="";
				document.getElementById('clave').value = "";
				document.getElementById('telefono').value = "";
				document.getElementById('rol').value = "";
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    alert("error creación usuario");
	    // ..
	  });
	  	
}

function agregar() {

	var nombreu = document.getElementById("nombre").value;
	var emailu = document.getElementById('email').value;
	var claveu = document.getElementById('clave').value;
	var preciop = document.getElementById('telefono').value;
	var proveedorp = document.getElementById('proveedor').value;
	
	db.collection("producto").add({
	
		cantidad: "cantidadp",
		marca: "marcap",
        nombre: "nombrep",
        precio: "preciop",
        proveedor: "proveedorp"

	})
	.then((docRef) => {
		 alert('El producto se guardo correctamente');
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		alert('Error');
	    console.error("Error adding document: ", error);
	});
	
	document.getElementById('form').style.display = "none";
	document.getElementById('visualizar').style.display = "block";
	
	document.getElementById('cantidad').value = "";
	document.getElementById('marca').value ="";
	document.getElementById('nombre').value = "";
	document.getElementById('precio').value = "";
	document.getElementById('proveedor').value = "";
}
//---------leerproductos	
	
function leerproducto() {	
	
	
	//---------consulta a la colección
		db.collection("producto")
				.onSnapshot((querySnapshot) => {
					document.getElementById('conproducto').innerHTML = "";
	    			querySnapshot.forEach((doc) => {
	    				//---------muestra la consulta
	        			//console.log(`${doc.id} => ${doc.data()}`);
	        			//console.log(`Nombre => ${doc.data().nombre}`);
						document.getElementById("conproducto").innerHTML += `
							<tr>
								<td>${doc.data().cantidad}</td>
								<td>${doc.data().marca}</td>
								<td>${doc.data().nombre}</td>
								<td>${doc.data().precio}</td>
								<td>${doc.data().proveedor}</td>
								<td>
									<span class="fas fa-edit" id="iconed" title="Editar" onclick="llenar_form('${doc.pid}', '${doc.data().cantidad}', '${doc.data().marca}', '${doc.data().nombre}', '${doc.data().precio}', '${doc.data().proveedor}')"></span>
									<span class="fas fa-trash-alt" id="iconbo" title="Elminar" onclick="pregunta_el('${doc.id}')"></span>								
								</td>
							</tr>
						
						`;	        			
	        			
	    			});
	});	
}

leerproducto();












