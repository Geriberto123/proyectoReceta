import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: any) {
    console.log(credentials, "desde el servicio");
    return new Promise((accept, reject) => {

      const validEmail = 'example@gmail.com';
      const validPassword = 'password123';

      if (
        credentials.email === validEmail &&
        credentials.password === validPassword
      ) {
        accept('Login correcto');
      } else {
        reject('Email o contraseña incorrectos');
      }
    });
  }
}