import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //importamos router
import {Storage} from '@ionic/storage-angular'; // importamos storage

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false, //añadimos esto en cada pagina 
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage
  ) { } //inyectamos router y storage

  ngOnInit() {
  }

  finish(){
    console.log('Finish');
    this.storage.set('viLaIntro', true); // GUARDAMOS EN EL STORAGE QUE YA SE HA MOSTRADO LA INTRODUCCIÓN
    this.router.navigateByUrl('/home'); //redireccionamos la pagina 
  }

}
