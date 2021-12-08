import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: boolean = true;
  isLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    try {
      this.global.showLoader();
      const val = await this.authService.getId();
      console.log('vlaue: ', val);
      if (val) this.navigate();
      this.global.hideLoader();
    } catch (e) {
      console.log(e);
      this.global.hideLoader();
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) return;
    this.login(form);
  }

  login(form) {
    this.isLogin = true;
    this.authService
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);
        this.navigate();
        this.isLogin = false;
        form.reset();
      })
      .catch((e) => {
        console.log(e);
        this.isLogin = false;
        let msg: string = 'could not sign you in try again';
        if (e.code == 'auth/user-not-found')
          msg = 'E-mail address could not be found';
        else if (e.code == 'auth/wrong-password')
          msg = 'wrong password try again';
        this.global.showAlert(msg);
      });
  }

  changeType() {
    this.type = !this.type;
  }

  navigate() {
    this.router.navigateByUrl('/tabs');
  }
}
