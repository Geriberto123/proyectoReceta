import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ModalController } from '@ionic/angular'; 
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { EditProfilePage } from '../edit-profile/edit-profile.page'; 

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };

  constructor(
    private userService: UserService,
    private storage: Storage,
    private alertController: AlertController,
    private modalController: ModalController 
  ) {}

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "Usuario");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  async openEditProfile() {
    const modal = await this.modalController.create({
      component: EditProfilePage, 
      componentProps: { user_data: this.user_data } 
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.user_data = result.data; 
        this.update(); 
      }
    });

    await modal.present();
  }

  async takePhoto() {
    const alert = await this.alertController.create({
      header: 'Selecciona una opción',
      message: '¿Deseas tomar una foto con la cámara o seleccionar una desde los documentos?',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.capturePhoto(CameraSource.Camera);
          }
        },
        {
          text: 'Documentos',
          handler: () => {
            this.capturePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });

    await alert.present();
  }

  async capturePhoto(source: CameraSource) {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: source,
        quality: 100
      });
      console.log(capturedPhoto.dataUrl);
      this.user_data.image = capturedPhoto.dataUrl;
      this.update();
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch((error) => {
      console.log(error);
    });
  }
}