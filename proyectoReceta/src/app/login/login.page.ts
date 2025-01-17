import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl:'./login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio'},
      { type: 'email', message: 'El correo no es valido'}
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6), 
        Validators.required
      ]))
    })
   }

  ngOnInit() {
  }
  loginUser(credentials: any){
    console.log(credentials, "Credenciales de login")
  }
}
