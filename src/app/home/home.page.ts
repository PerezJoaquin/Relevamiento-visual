import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { SubirFotoService } from '../servicios/subir-foto.service';

import { LoadingController, Platform, ToastController } from '@ionic/angular';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  showBar=false;
  tempurl="";
  images: LocalFile[] = [];
  constructor(private router:Router,
              private loginService:LoginService,
              private subPh:SubirFotoService,
              private plt: Platform,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController
              ) {}

  async ngOnInit() {}


  logout(){
    this.loginService.logout();
    /*Swal.fire({
      title: 'Log out',
      text: 'Sesión cerrada exitosamente.\nVolviendo al Log in',
      icon: 'success',
      confirmButtonText: 'OK!',
      heightAuto: false
    });*/
    this.router.navigate(['/login'])
  }

  subirFoto(event:any){
  }

  onFileSelected(event:any){
    alert("lel");
  }
}
