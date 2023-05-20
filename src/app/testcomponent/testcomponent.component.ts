import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubirFotoService } from 'src/app/servicios/subir-foto.service';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss'],
})
export class TestcomponentComponent  implements OnInit {

 
  showbuttons=true;
  localsele="";
  newimage='';
  foto='';
  loadingSpinner:any;

  constructor(private subfo:SubirFotoService, private loadingCtrl: LoadingController,
              private log:LoginService, private router:Router, ) { 

                this.subfo.traerUsuarios();
              }

  ngOnInit() {}

  select(modo:string){
    if(modo=="lindo"){
      this.subfo.selection="lindas";
      this.localsele="lindas"
    }else{
      this.subfo.selection="feas";
      this.localsele="feas";
    }
    this.showbuttons=false;
  }

  onFileSelected(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload=( (image)=>{
     
          this.newimage = image.target!.result as string;

      })
      reader.readAsDataURL(event.target.files[0])
    }
    const file = event.target.files[0];
    this.foto = file;
  }

  async showLoading() {
    this.loadingSpinner = await this.loadingCtrl.create({
      message: 'Subiendo foto . . .',
      //duration: 3000,
    });
    this.loadingSpinner.present();
  }

  async subFoto(){
    this.showLoading();
    if(await this.subfo.guardarFoto({foto:this.foto, usuario:this.log.usuarioActivo, categoria:this.localsele})){
      this.loadingSpinner.dismiss();
      Swal.fire({
        title: 'Éxito!',
        text: 'La foto ha sido guardado con éxito',
        icon: 'success',
        heightAuto: false,
        confirmButtonText: 'OK!'
      })
      this.router.navigate(['listado']);
    }else{
      this.loadingSpinner.dismiss();
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al guardar la foto',
        icon: 'error',
        heightAuto: false,
        confirmButtonText: 'Reintentar'
      })
    }
  }

  reselect(){
    this.showbuttons=true;
    this.subfo.selection="";
    this.localsele=""
    this.newimage='';
  }

  logou(){
    this.log.logout();
    localStorage.setItem("email", "");
    this.router.navigate(['login'])
  }

  list(){
    this.router.navigate(['tst']);
  }


}
