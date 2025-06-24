import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import * as _ from 'lodash';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import {
  convertCamelCaseTextToTitleCaseText,
  convertSnakeCaseTextToTitleCaseText,
} from 'src/app/utils/string';
import { IReviewSectionData } from '../review-field-section/review-field-section.component';

@Component({
    selector: 'app-review-interior-details',
    templateUrl: './review-interior-details.component.html',
    styleUrls: ['./review-interior-details.component.scss'],
    standalone: false
})
export class ReviewInteriorDetailsComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  @Output() isEmptyData = new EventEmitter<boolean>(false);
  bed = '';
  fullBath = '';
  halfBath = '';
  remodelingAndRenovation: string[] = [];
  fuelTypes: string[] = [];
  systems: string[] = [];
  coolingFeatures: string[] = [];
  pools: string[] = [];

  coolingFeaturesKey: { [key: string]: string } = {
    mini_split: 'Mini-Splits',
  };
  datas: IReviewSectionData[][] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.bed = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed`;
      this.fullBath = `${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Full Bath`;
      this.halfBath = `${this.propertyData.interiorDetails.bedsAndBathrooms.halfBaths} 1/2 Bath`;
      this.fuelTypes = (
        this.propertyData.interiorDetails.heating?.fuelType || []
      ).map((text) => convertSnakeCaseTextToTitleCaseText(text));
      this.systems = (
        this.propertyData.interiorDetails.heating?.system || []
      ).map((text) => convertSnakeCaseTextToTitleCaseText(text));
      this.pools = (this.propertyData.interiorDetails.pool?.type || []).map(
        (text) => convertSnakeCaseTextToTitleCaseText(text)
      );
      this.coolingFeatures = (
        this.propertyData.interiorDetails.cooling?.system || []
      ).map(
        (text) =>
          this.coolingFeaturesKey[text] ||
          convertSnakeCaseTextToTitleCaseText(text)
      );

      this.remodelingAndRenovation = [];
      _.forOwn(
        this.propertyData.interiorDetails.remodelingAndRenovation || {},
        (value, key) => {
          if (value.didRemodel) {
            this.remodelingAndRenovation.push(
              `${convertCamelCaseTextToTitleCaseText(key)} (Remodel Year: ${
                value.remodelYear
              })`
            );
          }
        }
      );
      this.datas = [];
      if (this.bed || this.fullBath || this.halfBath) {
        this.datas.push([
          {
            title1: 'Bedrooms and Bathrooms',
            items: [this.bed],
          },
          {
            title1: ' ',
            items: [this.fullBath],
          },
          {
            title1: ' ',
            items: [this.halfBath],
          },
        ]);
      }
      if (this.remodelingAndRenovation.length) {
        this.datas.push([
          {
            title1: 'Remodeling/Renovations',
            items: this.remodelingAndRenovation,
          },
        ]);
      }
      if (this.fuelTypes.length || this.systems.length) {
        this.datas.push([
          {
            title1: 'Heating',
            title2: 'Fuel Type',
            items: this.fuelTypes,
          },
          {
            title1: '  ',
            title2: 'System',
            items: this.systems,
          },
        ]);
      }
      if (this.coolingFeatures.length) {
        this.datas.push([
          {
            title1: 'Cooling',
            title2: 'Cooling Features',
            items: this.coolingFeatures,
          },
        ]);
      }
      if (this.pools.length) {
        this.datas.push([
          {
            title1: 'Pool',
            items: this.pools,
          },
        ]);
      }
      this.isEmptyData.emit(this.datas.length === 0);
    }
  }
}
