import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubirFotoService } from 'src/app/servicios/subir-foto.service';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/servicios/login.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const IMAGE_DIR = 'stored-images';

interface LocalFile{
  name:string;
  path:string;
  data:string;
}


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ]
})
export class PrincipalComponent  implements OnInit {

  showbuttons=true;
  localsele="";
  newimage='';
  foto:any;
  loadingSpinner:any;
  images: LocalFile[]=[];
  resfilenames:any;

  constructor(private subfo:SubirFotoService, private loadingCtrl: LoadingController,
              private log:LoginService, private router:Router, private platform:Platform) { 

                this.subfo.traerUsuarios();
              }

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles(){
    this.images=[];
    const loading = await this.loadingCtrl.create({
      message: 'actualizando'
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {

      //alert("res: "+result);
      console.log("filanames:", result);
      this.resfilenames=result;

      //alert("aux: "+this.resfilenames);
      //this.loadFileData(result.files)
    }, async err=>{
      //alert("errorLoadFiles");
      console.log("err:", err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      });
    }).then(_=>{ 
      loading.dismiss()
    })
  }

  async loadFileData(fileNames:any[]){
    //for (let f of fileNames) {
    //alert("fname: "+fileNames);
    //alert("resfilenames "+ this.resfilenames)
    for (let index = 0; index < this.resfilenames.files.length; index++) {
        
      this.newimage = "assets/spain.png";
      alert("f");
      const filepath='${IMAGE_DIR}/${fileNames[index]}';
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path:filepath
      })
      
      this.images.push({
        name:fileNames[index],
        path: filepath,
        data: 'data:image/jpeg;base64,${readFile.data}'
      });
    }
  }

  startUpload(){}
  deleteImage(){}

  async selectImage(){
    const image = await Camera.getPhoto({
      quality:20,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery:true
    }).then((result)=>{ 
      console.log(result)
      if(result.dataUrl){
        console.log(result)
        this.newimage = result.dataUrl;
        this.foto = result.dataUrl;
      }
      var n = new Date().toUTCString();
      console.log(n);

    }, err=>{
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al tomar la foto',
        icon: 'error',
        heightAuto: false,
        confirmButtonText: 'Entendido'
      })
    })

    /*if(image){
      this.saveImage(image);
    }*/
  }

  async saveImage(ph:Photo){
    /*alert(ph);
    const base64Data=await this.readAsBase64(ph);
    const fileName= new Date().getTime()+".jpeg";
    const savedFile= await Filesystem.writeFile({
      directory: Directory.Data,
      path: '${IMAGE_DIR}/${fileName}',
      data: base64Data,//no está guardando
      recursive: true
    })
    this.foto = base64Data;
    this.subFoto();
    this.loadFiles();*/
  }

  async readAsBase64(ph:Photo){
    if(this.platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path: ph.path as string
      });
      return file.data
    }else{
      const response = await fetch (ph.webPath as string);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blobl:Blob) => new Promise((resolve, reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result)
    };
    reader.readAsDataURL(blobl);
  })

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
    console.log(this.foto)
  }

  async showLoading() {
    this.loadingSpinner = await this.loadingCtrl.create({
      message: 'Subiendo foto . . .',
      //duration: 3000,
    });
    this.loadingSpinner.present();
  }

  async subFoto(){
    await this.showLoading();
    if(await this.subfo.guardarFoto({foto:this.foto, usuario:JSON.parse(localStorage.getItem("userdata") as string), categoria:this.localsele})){
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
    localStorage.setItem("userdata", "");
    this.router.navigate(['login'])
  }

  list(){
    this.router.navigate(['listado']);
  }

}
