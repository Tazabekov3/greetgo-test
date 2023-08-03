import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage {

  login: string = '';
  password: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  loginClicked() {
    if (this.login === 'login' && this.password === 'password') {
      this.router.navigateByUrl('/home');
    }
    else {
      alert('Неверный логин или пароль');
    }
  }
}
