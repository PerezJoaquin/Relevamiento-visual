import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { SubirFotoService } from './subir-foto.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	loggedUser:any;
	usuarioActivo='';
	usermail='';
  constructor( private auth:Auth, private fdb:SubirFotoService) { 
	this.fdb.traerUsuarios();
	
  }

  async loginService(email:string, pass:string){
    
    try {
		const user = await signInWithEmailAndPassword(this.auth, email, pass);
      
      	console.log("yay");
      
      //this.usuarioActivo = email;
		this.loggedUser = user;
      //console.log(user);
	  	localStorage.setItem('email', email);
      	this.nombreUser(email);
      return true;
		} catch (e) {
      console.log("nay");
			return false;
		}
  }

  async nombreUser(email:string){
	

    
    try {
		const nom = await this.fdb.getNombre(email);
		this.usuarioActivo = nom;
		localStorage.setItem('nombre', nom);
		console.log("nombre yay", this.usuarioActivo)
		return true;
	} catch (e) {
      	console.log("nombre nay");
		return false;
	}
  }

  logout() {
	localStorage.setItem('nombre', '');
	  	return signOut(this.auth);
	}

	reloadNom(){
		this.usuarioActivo = localStorage.getItem('nombre') as string;
	  }

	cargarUsuario(){
		this.usuarioActivo = JSON.parse(localStorage.getItem("userdata") as string);
	}
}
