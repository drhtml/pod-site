import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { EventService } from 'src/app/services/event.service';
import { formatPrice } from 'src/app/utils/string';

@Component({
    selector: 'app-summary-right',
    templateUrl: './summary-right.component.html',
    styleUrls: ['./summary-right.component.scss'],
    standalone: false
})
export class SummaryRightComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  text1 = '';
  text3 = '';
  text4 = '';
  text5 = '';
  price = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.price = formatPrice(this.propertyData.plan?.price || '');
      this.text1 = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed • ${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Bath • ${this.propertyData.houseFacts.livableSquareFootage.total} sq. ft.`;

      const addressHouseNumber =
        this.propertyData.houseFacts.address.houseNumber;
      const addressStreetName = this.propertyData.houseFacts.address.streetName;
      const addressCity = this.propertyData.houseFacts.address.city;
      const addressState = this.propertyData.houseFacts.address.state;
      const addressZip = this.propertyData.houseFacts.address.zipCode;
      this.text3 = `${addressHouseNumber} ${addressStreetName} ${addressCity}, ${addressState} ${addressZip}`;
      this.text4 = `Schools District: ${this.propertyData.houseFacts.schoolDistrict}`;
      this.text5 = `${this.propertyData.propertyDetails.bedroomsAndBathrooms.yearBuilt}`;
    }
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }
}
