import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import Chart from 'chart.js/auto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ]
})
export class ResultadoComponent  implements OnInit {

  lindascol:any;
  feascol:any;
  modo="resultados";

  chart:any;
  chartDon:any;
  userr:any;

  constructor(private router:Router, private log:LoginService, public aFirestore:AngularFirestore) { 

    this.userr = JSON.parse(localStorage.getItem("userdata") as string);
    console.log(this.userr)
    this.aFirestore.collection('feas', ref => ref.orderBy('fecha', "desc")).valueChanges().subscribe((next:any)=>{
      this.feascol = next;
      console.log(this.feascol)
      this.createChart();
    });

    this.aFirestore.collection('lindas', ref => ref.orderBy('fecha', "desc")).valueChanges().subscribe((next:any)=>{
      this.lindascol = next;
      console.log(this.lindascol)
      this.createDon();
    });
    
  }

  ngOnInit() {
    
  }

  createChart(){
    const lab =[];
    const dat =[];

    for (let index = 0; index < this.feascol.length; index++) {
      lab.push(this.feascol[index].votos as string)
      dat.push(this.feascol[index].usuario.usuario as string)
    }
    console.log(lab)
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: dat/*['<img src="https://i.stack.imgur.com/DleAU.png">', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ]*/, 
	       datasets: [
          /*{
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },*/
          {
            label: "Votos",
            data: lab /*['4', '5', '3', '7', '17',
									 '0.00', '8', '1']*/,
            backgroundColor: 'blue'
          }  
        ]
      },
      options: {
        plugins:{
          legend:{
            display:false
          }
        },
        events:['click'],
        aspectRatio:2.3,
        onClick:this.clickHandler,
        indexAxis: 'y',
        
      }
      
    });
  }

  createDon(){
    const lab =[];
    const dat =[];

    for (let index = 0; index < this.lindascol.length; index++) {
      lab.push(this.lindascol[index].votos as string)
      dat.push(this.lindascol[index].usuario.usuario as string) 
    }
    console.log(lab)
  
    this.chart = new Chart("MyDonut", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: dat/*['<img src="https://i.stack.imgur.com/DleAU.png">', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ]*/, 
	       datasets: [
          /*{
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },*/
          {
            label: "Votos",
            data: lab /*['4', '5', '3', '7', '17',
									 '0.00', '8', '1']*/,
            backgroundColor: 'blue'
          }  
        ]
      },
      options: {
        plugins:{
          legend:{
            display:false
          }
        },
        events:['click'],
        aspectRatio:2.3,
        onClick:this.clickHandler,
        
      }
      
    });
  }

 
  clickHandler(event:any, elements:any){
    /*if(elements.length > 0){
      this.aFirestore.collection('feas', ref => ref.orderBy('fecha', "desc")).valueChanges().subscribe((next:any)=>{
        /*this.feascol = next;
        var reif = elements[0].index;*
        //console.log(this.feascol);
        console.log(next)
        this.createChart();
      });*/
    
      
      /*Swal.fire({
        html: '<img src="'+this.feascol[reif].foto+'">',
        heightAuto: false,
        confirmButtonText: 'Cerrar'
      })
    }*/
  }



  misfotos(){
    this.modo="misfotos";
  }

  resuta(){
    this.modo="resultados";
  }

  camera(){
    this.router.navigate(['principal'])
  }

  galeria(){
    this.router.navigateByUrl("listado")
  }

  logout(){
    this.log.logout();
    localStorage.setItem("email", "");
    localStorage.setItem("userdata", "");
    this.router.navigate(['login'])
  }
}
function clickHandler() {
  throw new Error('Function not implemented.');
}

