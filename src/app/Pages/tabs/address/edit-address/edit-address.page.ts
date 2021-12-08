import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  form: FormGroup;
  location_name: string = 'location...';
  isSubmitted = false;
  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      house: new FormControl('', { validators: [Validators.required] }),
      landmark: new FormControl('', { validators: [Validators.required] }),
    });
  }

  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }

  onSubmit() {
    this.toggleSubmit();
    console.log(this.form);
    if (!this.form.valid) return;
    setTimeout(() => {
      this.toggleSubmit();
    }, 2000);
  }
}
