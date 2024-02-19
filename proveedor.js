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

//---------agregar proveedor

function agregar() {

	var cedulas = document.getElementById('cedula').value;
	var correos = document.getElementById('correo').value;
	var localidads = document.getElementById('localidad').value;
	var nombreRazonSocials = document.getElementById('nombreRazonSocial').value;
	var productoss = document.getElementById('productos').value;
    var telefonoMovils = document.getElementById('telefonoMovil').value;
	
	db.collection("proveedor").add({
	
		cedula: cedulas,
		correo: correos,
        localidad: localidads,
        nombreRazonSocial: nombreRazonSocials,
        productos: productoss,
        telefonoMovil: telefonoMovils,

	})
	.then((docRef) => {
		 alert('El proveedor se guardo correctamente');
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		alert('Error');
	    console.error("Error adding document: ", error);
	});
	
	document.getElementById('form').style.display = "none";
	document.getElementById('visualizar').style.display = "block";
	
	document.getElementById('cedula').value = "";
	document.getElementById('correo').value ="";
	document.getElementById('localidad').value = "";
	document.getElementById('nombreRazonSocial').value = "";
	document.getElementById('productos').value = "";
    document.getElementById('telefonoMovil').value = "";
}
//---------leerproveedor	
	
function leerproveedor() {	
	
	
	//---------consulta a la colección
		db.collection("proveedor")
				.onSnapshot((querySnapshot) => {
					document.getElementById('conproveedor').innerHTML = "";
	    			querySnapshot.forEach((doc) => {
	    				//---------muestra la consulta
	        			//---------console.log(`${doc.id} => ${doc.data()}`);
	        			//---------console.log(`Nombre => ${doc.data().nombre}`);
						document.getElementById("conproveedor").innerHTML += `
							<tr>
								<td>${doc.data().cedula}</td>
								<td>${doc.data().correo}</td>
								<td>${doc.data().localidad}</td>
								<td>${doc.data().nombreRazonSocial}</td>
								<td>${doc.data().productos}</td>
                                <td>${doc.data().telefonoMovil}</td>
								<td>
									<span class="fas fa-edit" id="iconed" title="Editar" onclick="llenar_form('${doc.pid}', '${doc.data().cedula}', '${doc.data().correo}', '${doc.data().localidad}', '${doc.data().nombreRazonSocial}', '${doc.data().productos}', '${doc.data().telefonoMovil}')"></span>
									<span class="fas fa-trash-alt" id="iconbo" title="Elminar" onclick="pregunta_el('${doc.id}')"></span>								
								</td>
							</tr>
						
						`;	        			
	        			
	    			});
	});	
}

leerproveedor();
	
	
	
//eliminar proveedor	

function pregunta_el(pid) {
	console.log(pid);
	if(confirm("Esta seguro de eliminar el registro")){
		eliminar(pid);	
	}else {
		console.log("no se borro");
	}
}
	
function eliminar(pid) {
	
	db.collection("proveedor").doc(pid).delete().then(() => {
		 alert("Se ha eliminado el proveedor");	    
	    //console.log("Document successfully deleted!");
	}).catch((error) => {
		 alert("error");
	    console.error("Error removing document: ", error);
	});
}	

//---------editar registro


function llenar_form(pid, cedula, correo, localidad, nombreRazonSocial, productos, telefonoMovil) {
	
	document.getElementById('cedula').value = cedula;
	document.getElementById('correo').value = correo;
	document.getElementById('localidad').value = localidad;
	document.getElementById('nombreRazonSocial').value = nombreRazonSocial;
	document.getElementById('productos').value = productos;
    document.getElementById('telefonoMovil').value = telefonoMovil;
	mostrar('ver');
	document.getElementById('botong').style.display = "none";
	document.getElementById('botone').style.display = "block";
}


function editar() {


	var cedulas = document.getElementById('cedula').value;
	var correos = document.getElementById('correo').value;
	var localidads = document.getElementById('localidad').value;
	var nombreRazonSocials = document.getElementById('nombreRazonSocial').value;
	var productos = document.getElementById('productos').value;
    var telefonoMovils = document.getElementById('telefonoMovil').value;
	
	var proveedorRef = db.collection("proveedor").doc(pid);
			
			// Set the "capital" field of the city 'DC'
			return proveedorRef.update({

			    cedula: cedulas,
	            correo: correos,
                localidad: localidads,
	            nombreRazonSocial: nombreRazonSocials,
	            producto: productos,
                telefonoMovil: telefonoMoviles,
			})
			.then(function() {
			    console.log("Document successfully updated!");
				   document.getElementById('visualizar').style.display = "block";
	
					document.getElementById('cedula').value = "";
					document.getElementById('correo').value ="";
					document.getElementById('localidad').value = "";
					document.getElementById('nombreRazonSocial').value = "";
                    document.getElementById('producto').value = "";
					document.getElementById('telefonoMovil').value = "";
				   mostrar('ocultar');  
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    alert("error");
			    console.error("Error updating document: ", error);
			});
			
}