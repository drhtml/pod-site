import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { EventService } from 'src/app/services/event.service';
import { LeadService } from 'src/app/services/lead.service';
import { PropertyService } from 'src/app/services/property.service';
import { phoneNumberValidator } from 'src/app/utils/form';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    standalone: false
})
export class ContactUsComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  propertyName: string = '';
  propertyId: string = '';
  pricePointId: string = '';

  public form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, phoneNumberValidator()]),
  });

  constructor(
    private propertyService: PropertyService,
    private leadService: LeadService,
    private _snackBar: MatSnackBar,
    public eventService: EventService
  ) {
    super();
  }

  ngOnInit(): void {
    this.propertyService.bkPropertyInfo.subscribe((result) => {
      this.propertyName = result?.data.name || '';
      this.propertyId = result?.data._id || '';
      this.pricePointId = result?.data.plan?._id || '';
    });
  }

  submitForm() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.markAsTouched();
    });

    const formValue = this.form.value;
    if (this.form.invalid) {
      return;
    }
    this.clickButton('contact us submit');

    this.addSubscriptions(
      this.leadService
        .newLead({
          firstName: formValue.firstName || '',
          lastName: formValue.lastName || '',
          email: formValue.email || '',
          phone: formValue.phone || '',
          pricePointId: this.pricePointId,
          propertyId: this.propertyId,
        })
        .subscribe((rs) => {
          if (rs.success === false) {
            const failResponse = rs as IFailRequest;
            this._snackBar.open(failResponse.message, 'CLOSE', {
              verticalPosition: 'top',
              panelClass: 'error',
              duration: 3000,
            });
          } else {
            this._snackBar.open('Success.', 'CLOSE', {
              verticalPosition: 'top',
              panelClass: 'success',
              duration: 3000,
            });
          }
        })
    );
  }

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }
}
