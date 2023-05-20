import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/servicios/login.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent  implements OnInit {
  

  constructor(private router: Router,private loginService: LoginService,
              public formBuilder: FormBuilder, private loadingCtrl: LoadingController, private nativeAudio: NativeAudio) { 
                const recMail = localStorage.getItem("email");
                if(recMail&&recMail!=""){
                  this.router.navigate(['principal'])
                }
                
              }

              
  ionicForm!: FormGroup;
  email!:string;
  pass!:string;
  isSubmitted = false;
  loadingSpinner:any;

  ngOnInit() {
    this.nativeAudio.preloadSimple('camera', 'assets/camera.wav');
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
    
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  usuarios = [{"email":"mail", "pass":"pass"}];
  result = "";
  log = false;
  validation=false;

  validate(){
    return true;
  }

  async login(){
    
    this.isSubmitted = true;
    this.validate();
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      //return false;
    } else {
      this.showLoading();
      console.log(this.ionicForm.value);
      const logedUser = await this.loginService.loginService(this.email, this.pass)!;
      console.log(logedUser);


      if(logedUser != null){
        console.log("Login!");
        this.loadingSpinner.dismiss();
        localStorage.setItem('email', this.email);
        //Swal.fire('Ingreso Exitoso', 'Bienvenido '+this.email, 'success');
        /*Swal.fire({
          title: 'Ingreso',
          text: 'Bienvenido ' + this.email,
          icon: 'success',
          confirmButtonText: 'OK!',
          heightAuto: false
        });*/
        this.email = "";
        this.pass = "";
        this.isSubmitted = false;
        this.nativeAudio.play('camera');
        this.router.navigate(['principal'])
      }else{
        console.log("No login");
        this.loadingSpinner.dismiss();
        Swal.fire({
          title: 'Error',
          text: 'El correo o contraseña son incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente',
          heightAuto: false
        })
      }  
    }
  }

  loadUser(userNum:number){
    switch(userNum){
      case 1:
        this.email="owain.ozana@gmail.com";
        this.pass="748159263aaAA";
        //this.showLoading();
        break;
      case 2:
        this.email="nikandros@yahoo.com";
        this.pass="12546789AbcD";
        break;
      case 3:
        this.email="leonidasduri@outlook.com";
        this.pass="aswerwwetrBHGT1254";
        break;
      case 4:
        this.email="profe@gmail.com";
        this.pass="445632154werT";
        break;
      case 5:
        this.email="jasmingonzales@yahoo.com";
        this.pass="asdawdsSA46";
        break;
      case 6:
        this.email="gaston@outlook.com";
        this.pass="fgdsfg465RW";
        break;
      case 7:
        this.email="juanjose@gmail.com";
        this.pass="dhds546513aS";
        break;
    }
  }

  //á é í ó ú

  async showLoading() {
    this.loadingSpinner = await this.loadingCtrl.create({
      message: 'Iniciado sesión . . .',
      //duration: 3000,
    });
    this.loadingSpinner.present();
  }

  goBack(){
    this.router.navigate(['/']);
  }
  animsplash(){
    //this.router.navigate(['animated-splash'])
    //this.router.navigateByUrl('animated-splash')
  }

  taler(){
    alert("todavía no lo implementé")
  }

  
}
