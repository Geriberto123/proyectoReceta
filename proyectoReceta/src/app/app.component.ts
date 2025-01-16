import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'; //importamos registro de swiper
import { Storage } from '@ionic/storage-angular'; //importamos storage
register(); //registramos el swiper
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage) {} //inicializar el storage
  async ngOnInit() { //añadimos metodo
    await this.storage.create(); //creamos el storage
  }
}
