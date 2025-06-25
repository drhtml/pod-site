import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  IResponseProperty,
  IResponsePhotos,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { formatPrice, getFileNameWithoutExtension } from 'src/app/utils/string';

@Component({
    selector: 'app-review-property-header',
    templateUrl: './review-property-header.component.html',
    styleUrls: ['./review-property-header.component.scss'],
    standalone: false
})
export class ReviewPropertyHeaderComponent implements OnInit, OnChanges {
  @Input() showPropertyHeaderDetail = true;
  @Input() propertyData?: IResponseProperty;
  location = '';
  description = '';
  price = '';
  evaluationStatus = '';
  photos: IResponsePhotos[] = [];
  selectedPhoto?: IResponsePhotos;

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      const addressHouseNumber =
        this.propertyData.houseFacts.address.houseNumber;
      const addressStreetName = this.propertyData.houseFacts.address.streetName;
      const addressCity = this.propertyData.houseFacts.address.city;
      const addressState = this.propertyData.houseFacts.address.state;
      const addressZip = this.propertyData.houseFacts.address.zipCode;
      this.location = `${addressHouseNumber} ${addressStreetName} ${addressCity}, ${addressState} ${addressZip}`;
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
      this.description = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed • ${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Bath`;
      this.photos = _.filter(this.propertyData.photos, (item) => {
        return _.every(this.propertyData?.floorPlans, (floorPlan) => {
          return item.name !== floorPlan;
        });
      });
      if (
        this.photos[0] &&
        (!this.selectedPhoto || this.photos[0]._id !== this.selectedPhoto?._id)
      ) {
        this.loading = true;
        this.selectedPhoto = this.photos[0];
      }
    }
  }

  loading: boolean = false;
  onLoad() {
    this.loading = false;
  }

  selectImage(img: IResponsePhotos) {
    if (!this.selectedPhoto || img._id !== this.selectedPhoto?._id) {
      this.selectedPhoto = img;
      this.loading = true;
    }
  }
}
