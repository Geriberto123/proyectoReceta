import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false
})
export class EditProfilePage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    image: '',
  };

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    this.modalController.dismiss(this.user_data);
  }

  async changeImage() {
    const alert = await this.alertController.create({
      header: 'Selecciona una opción',
      message: '¿Deseas tomar una foto con la cámara o seleccionar una desde los documentos?',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.capturePhoto(CameraSource.Camera);
          },
        },
        {
          text: 'Documentos',
          handler: () => {
            this.capturePhoto(CameraSource.Photos);
          },
        },
      ],
    });

    await alert.present();
  }

  async capturePhoto(source: CameraSource) {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: source,
        quality: 100,
      });
      this.user_data.image = capturedPhoto.dataUrl;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }
}