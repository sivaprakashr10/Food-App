import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddressPageRoutingModule } from './edit-address-routing.module';

import { EditAddressPage } from './edit-address.page';
import { MapsComponent } from 'src/app/components/maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditAddressPageRoutingModule,
  ],
  declarations: [EditAddressPage, MapsComponent],
})
export class EditAddressPageModule {}
