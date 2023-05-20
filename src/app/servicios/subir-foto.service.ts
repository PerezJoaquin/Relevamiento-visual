import { inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class SubirFotoService {

  location = "uploads/";
  selection="";
  usercol!:any;
  myuser='';


  constructor(private fbs:AngularFireStorage, private aFirestore:AngularFirestore) { }

  async getNombre(mail:string){
    let nom="";
    for(let i=0; i < this.usercol.length;i++){
      if(this.usercol[i].mail == mail){
        nom = this.usercol[i];
        localStorage.setItem("userdata", JSON.stringify(nom));
        this.myuser=nom;
        //console.log("dound", nom)
        break;
      }
    }
    return nom;
  }

  async traerUsuarios(){
    this.usercol = this.aFirestore.collection('usuarios');
    this.usercol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.usercol = next; 
      this.getNombre(localStorage.getItem("email") as string)
      return next;
    })
  }

  async guardarFoto(foto:any){
    //const immgurl = await this.subirFoto(foto);
    const immgurl = foto.foto;
    var n = Date.now();
    var f = new Date();
    const col = this.aFirestore.collection(foto.categoria);
    const documento = this.aFirestore.doc(foto.categoria+'/'+this.aFirestore.createId());
    try {
      await documento.set({
        id:documento.ref.id,
        usuario: foto.usuario,
        foto: immgurl,
        fecha: n,
        votos:0,
        fechaplana:f.toUTCString()
      });
      return true;
    } catch (error) {
      return false;
    }
     
  }

  async subirFoto(foto:any){
    return new Promise(resolve=>{
      var n = Date.now();
      const filePath = `fotos/${n}`;
      const fileRef = this.fbs.ref(filePath);
      const task = this.fbs.upload(`fotos/${n}`, foto.foto);
      task.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((res: any) => {
            const url = res;
            console.log(url);
            resolve(url);
            return;
          })
        })
      ).subscribe();
    });
  }

  async actuaizarFoto(foto:any, cat:string){
    const documento = this.aFirestore.doc(cat+'/'+foto.id);
    documento.update(foto);
  }

  async actuaizarUsuario(user:any){
    const documento = this.aFirestore.doc('usuarios/'+user.id);
    documento.update(user);
  }
}
