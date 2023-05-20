import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SubirFotoService } from './servicios/subir-foto.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _router:Router, private plat:Platform, private fdb:SubirFotoService){
    
    this.initializeApp()
  }

  initializeApp(){
    this.plat.ready().then(()=>{
      this.fdb.traerUsuarios();
      this._router.navigateByUrl("csplash");
    })
  }
  
}
