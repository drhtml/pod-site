import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    InputFieldModule,
    ButtonModule,
  ],
})
export class ContactUsModule {}
