import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Plugins } from '@capacitor/core';
const {SplashScreen}=Plugins;



@Component({
  selector: 'app-customsplash',
  templateUrl: './customsplash.component.html',
  styleUrls: ['./customsplash.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ]
})
export class CustomsplashComponent  implements OnInit {

  showload=true;

  constructor(private router:Router) {
    /*setTimeout(()=>{
      this.showload=false;
    }, 800)*/
    setTimeout(()=>{
      this.router.navigateByUrl('login')
    }, 3000)
   }

  ngOnInit() {}

}
