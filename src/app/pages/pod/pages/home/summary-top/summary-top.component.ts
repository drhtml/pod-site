import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { EventService } from 'src/app/services/event.service';
import { formatPrice } from 'src/app/utils/string';

@Component({
    selector: 'app-summary-top',
    templateUrl: './summary-top.component.html',
    styleUrls: ['./summary-top.component.scss'],
    standalone: false
})
export class SummaryTopComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  text1 = '';
  text2 = '';
  text3 = '';
  price = '';
  evaluationStatus = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      const pricePoints = this.propertyData.plan?.pricePoints || [];
      if (pricePoints.length > 0 && pricePoints[0].price) {
        this.price = formatPrice(pricePoints[0].price.toString());
      } else {
        this.price = formatPrice(this.propertyData.plan?.price || '');
      }
      if (pricePoints.length > 0) {
        const pricePoint = pricePoints[0];
        const currentDate = new Date();
        const startDate = new Date(pricePoint.startDate);
        const endDate = new Date(pricePoint.endDate);
        if (currentDate < startDate) {
          this.evaluationStatus = 'Not Started';
        } else if (currentDate > startDate && currentDate < endDate) {
          this.evaluationStatus = 'In Progress';
        } else {
          this.evaluationStatus = 'Completed';
        }
      } else {
        this.evaluationStatus = '';
      }
      this.text1 = `${this.propertyData.houseFacts.address}`;
      this.text2 = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed • ${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Bath • ${this.propertyData.houseFacts.livableSquareFootage.total} sq. ft.`;
      this.text3 = `Schools District: ${this.propertyData.houseFacts.schoolDistrict}`;
    }
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }
}
