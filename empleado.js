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

//---------agregar empleado

function agregar() {
	var apellidoe = document.getElementById('apellido').value;
	var cargoe = document.getElementById('cargo').value;
	var cedulae = document.getElementById('cedula').value;
	var correoe = document.getElementById('correo').value;
	var nombree = document.getElementById('nombre').value;
    var telefonoMovile = document.getElementById('telefonoMovil').value;
	
	db.collection("empleado").add({
	
	    apellido: apellidoe,
	    cargo: cargoe,
        cedula: cedulae,
	    correo: correoe,
	    nombre: nombree,
        telefonoMovil: telefonoMovile,

	})
	.then((docRef) => {
		 alert('El Empleado se guardo correctamente');
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		alert('Error');
	    console.error("Error adding document: ", error);
	});
	
	document.getElementById('form').style.display = "none";
	document.getElementById('visualizar').style.display = "block";
	
	document.getElementById('apellido').value = "";
	document.getElementById('cargo').value ="";
	document.getElementById('cedula').value = "";
	document.getElementById('correo').value = "";
	document.getElementById('nombre').value = "";
    document.getElementById('telefonoMovil').value = "";
}
//---------leerempleado	
	
function leerempleado() {	
	
	
	//---------consulta a la colección
		db.collection("empleado")
				.onSnapshot((querySnapshot) => {
					document.getElementById('conempleado').innerHTML = "";
	    			querySnapshot.forEach((doc) => {
	    				//---------muestra la consulta
	        			//---------console.log(`${doc.id} => ${doc.data()}`);
	        			//---------console.log(`Nombre => ${doc.data().nombre}`);
						document.getElementById("conempleado").innerHTML += `
							<tr>
								<td>${doc.data().apellido}</td>
								<td>${doc.data().cargo}</td>
								<td>${doc.data().cedula}</td>
								<td>${doc.data().correo}</td>
								<td>${doc.data().nombre}</td>
                                <td>${doc.data().telefonoMovil}</td>
								<td>
									<span class="fas fa-edit" id="iconed" title="Editar" onclick="llenar_form('${doc.pid}', '${doc.data().apellido}', '${doc.data().cargo}', '${doc.data().cedula}', '${doc.data().correo}', '${doc.data().nombre}'), '${doc.data().telefonoMovil}'"></span>
									<span class="fas fa-trash-alt" id="iconbo" title="Elminar" onclick="pregunta_el('${doc.id}')"></span>								
								</td>
							</tr>
						
						`;	        			
	        			
	    			});
	});	
}

leerempleado();
	
	
	
//eliminar empleado	

function pregunta_el(pid) {
	//console.log(pid);
	if(confirm("Esta seguro de eliminar el registro")){
		eliminar(pid);	
	}else {
		console.log("no se borro");
	}
}
	
function eliminar(pid) {
	
	db.collection("empleado").doc(pid).delete().then(() => {
		 alert("Se ha eliminado el empleado");	    
	    //console.log("Document successfully deleted!");
	}).catch((error) => {
		 alert("error");
	    console.error("Error removing document: ", error);
	});
}	

//---------editar registro

function llenar_form(pid, apellido, cargo, cedula, correo, nombre, telefonoMovil) {
	
	document.getElementById('apellido').value = apellido;
	document.getElementById('cargo').value = cargo;
	document.getElementById('cedula').value = cedula;
	document.getElementById('correo').value = correo;
	document.getElementById('nombre').value = nombre;
    document.getElementById('telefonoMovil').value = telefonoMovil;
	mostrar('ver');
	document.getElementById('botong').style.display = "none";
	document.getElementById('botone').style.display = "block";
}


function editar() {


	var apellidoe = document.getElementById('apellido').value;
	var cargoe = document.getElementById('cargo').value;
	var cedulae = document.getElementById('cedula').value;
	var correoe = document.getElementById('correo').value;
	var nombree = document.getElementById('nombre').value;
    var telefonoMovile = document.getElementById('telefonoMovil').value;
	
	var empleadoRef = db.collection("empleado").doc(pid);
			
			// Set the "capital" field of the city 'DC'
			return empleadoRef.update({

			    apellido: apellidoe,
	            cargo: cargoe,
                cedula: cedulae,
	            correo: correoe,
	            nombre: nombree,
                telefonoMovil: telefonoMovile,
			})
			.then(function() {
			    console.log("Document successfully updated!");
				   document.getElementById('visualizar').style.display = "block";
	
					document.getElementById('apellido').value = "";
					document.getElementById('cargo').value ="";
					document.getElementById('cedula').value = "";
					document.getElementById('correo').value = "";
                    document.getElementById('nombre').value = "";
					document.getElementById('telefonoMovil').value = "";
				   mostrar('ocultar');  
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    alert("error");
			    console.error("Error updating document: ", error);
			});
			
}