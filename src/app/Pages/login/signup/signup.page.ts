import { GlobalService } from 'src/app/services/global/global.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading: boolean = false;
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
    if (!form.valid) return;
    this.register(form);
  }
  register(form: NgForm) {
    this.isLoading = true;
    console.log(form);
    this.authService
      .register(form.value)
      .then(() => {
        this.navigate();
        this.isLoading = false;
        form.reset();
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
        let msg: string = 'Could not sign you up, plese try again.';
        if (e.code == 'auth/email-already-in-use') {
          msg = e.message;
        }
        this.global.showAlert(msg);
      });
  }

  navigate() {
    this.router.navigateByUrl('/tabs');
  }
}
