import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false
})
export class EditProfilePage {
  @Input() user_data: any;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss(); 
  }

  saveChanges() {
    this.modalController.dismiss(this.user_data); 
  }
}