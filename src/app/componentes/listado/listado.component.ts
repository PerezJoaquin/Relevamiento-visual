import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubirFotoService } from 'src/app/servicios/subir-foto.service';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/servicios/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ]
})
export class ListadoComponent  implements OnInit {

  lindascol:any;
  feascol:any;
  logg:any;
  lindavote=true;
  feavote=true;
  loadingSpinner:any;
  modo="lindas";
  booksCollectionRef:any;

  constructor(private aFirestore:AngularFirestore, private log:LoginService, private subfo:SubirFotoService,
              private loadingCtrl: LoadingController, private router:Router) { 
                this.showLoading(2000)
    /*this.lindascol = this.aFirestore.collection('lindas');
    this.lindascol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.lindascol = next; 
      return next;
    })*/
    this.lindascol = this.aFirestore.collection('lindas', ref => ref.orderBy('fecha', "desc")).valueChanges();

    /*this.feascol = this.aFirestore.collection('feas');
    this.feascol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.feascol = next;
      return next;
    }) */
    this.feascol = this.aFirestore.collection('feas', ref => ref.orderBy('fecha', "desc")).valueChanges();

    this.logg= JSON.parse(localStorage.getItem("userdata") as string);
    
    //this.cooso();
    
    /*if(this.logg.idlinda){
      this.lindavote=true;
    }else{
      this.lindavote=false
    }
    if(this.logg.idfea){
      this.feavote=true;
    }else{
      this.feavote=false
    }*/
  }

  async cooso(){
    //this.booksCollectionRef = this.aFirestore.collection('lindas');
    this.booksCollectionRef = this.aFirestore.collection('lindas', ref => ref.orderBy('fecha', "desc")).valueChanges();
    //console.log("books", this.booksCollectionRef)

  }
  async showLoading(dur:number) {
    this.loadingSpinner = await this.loadingCtrl.create({
      message: 'Actualizando . . .',
      duration: dur,
    });
    this.loadingSpinner.present();
  }

  ngOnInit() {}

  async votarLinda(foto:any){
    this.showLoading(2000);
    foto.votos +=1;
    this.logg.votolinda=true;
    this.logg.idlinda=foto.id;
    await this.subfo.actuaizarFoto(foto, "lindas");
    await this.subfo.actuaizarUsuario(this.logg);
    //this.loadingSpinner.dismiss();
  }

  async devotarLinda(foto:any){
    this.showLoading(2000);
    foto.votos -=1;
    this.logg.votolinda=false;
    this.logg.idlinda="";
    await this.subfo.actuaizarFoto(foto, "lindas");
    await this.subfo.actuaizarUsuario(this.logg);
    //this.loadingSpinner.dismiss();
  }

  async votarFea(foto:any){
    this.showLoading(2000);
    foto.votos +=1;
    this.logg.votofea=true;
    this.logg.idfea=foto.id;
    await this.subfo.actuaizarFoto(foto, "feas");
    await this.subfo.actuaizarUsuario(this.logg);
    //this.loadingSpinner.dismiss();
  }

  async devotarFea(foto:any){
    this.showLoading(2000);
    foto.votos -=1;
    this.logg.votofea=false;
    this.logg.idfea="";
    await this.subfo.actuaizarFoto(foto, "feas");
    await this.subfo.actuaizarUsuario(this.logg);
    //this.loadingSpinner.dismiss();
  }


cambiarModo(){
  this.showLoading(1000);
  if(this.modo=="lindas"){
    this.modo="feas";
  }else{
    this.modo="lindas";
  }
}

irGraficos(){
  this.router.navigateByUrl("resultados");
}
  
logout(){
  this.log.logout();
    localStorage.setItem("email", "");
    localStorage.setItem("userdata", "");
    this.router.navigate(['login'])
}
recam(){
  this.router.navigate(['principal'])
}

}
