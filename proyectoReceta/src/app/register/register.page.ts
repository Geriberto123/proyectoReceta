import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;

  formErrors = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 2 caracteres' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'minlength', message: 'El apellido debe tener al menos 2 caracteres' }
    ],
    username: [
      { type: 'required', message: 'El usuario es obligatorio' },
      { type: 'minlength', message: 'El usuario debe tener al menos 4 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'La confirmación de la contraseña es obligatoria' },
      { type: 'mustMatch', message: 'Las contraseñas no coinciden' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),
        lastname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),
        username: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
        passwordConfirmation: new FormControl('', Validators.compose([
          Validators.required
        ]))
      },
      { validators: this.passwordMatchValidator } 
    );
  }

  ngOnInit() {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('passwordConfirmation')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  registerUser(registerData: any) {
    this.authService.register(registerData).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/login');
    }).catch(err => {
      console.log(err);
      this.errorMessage = err;
    });
}
navigateToLogin() {
  this.navCtrl.navigateForward('/login');
}
}