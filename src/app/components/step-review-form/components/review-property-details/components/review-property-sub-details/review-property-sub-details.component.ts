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
import { IReviewSectionData } from '../review-field-section/review-field-section.component';

@Component({
    selector: 'app-review-property-sub-details',
    templateUrl: './review-property-sub-details.component.html',
    styleUrls: ['./review-property-sub-details.component.scss'],
    standalone: false
})
export class ReviewPropertySubDetailsComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  @Output() isEmptyData = new EventEmitter<boolean>(false);
  datas: IReviewSectionData[][] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      const aboveGrade =
        this.propertyData.houseFacts.livableSquareFootage.aboveGrade;
      const belowGrade =
        this.propertyData.houseFacts.livableSquareFootage.belowGrade;
      const total = this.propertyData.houseFacts.livableSquareFootage.total;

      this.datas = [];
      if (aboveGrade) {
        this.datas.push([
          {
            title1: 'Liveable Square Footage',
            title2: 'Above Grade',
            items: [`${aboveGrade} sq. ft.`],
          },
        ]);
      }
      if (belowGrade) {
        this.datas.push([
          {
            title2: 'Below Grade',
            items: [`${belowGrade} sq. ft.`],
          },
        ]);
      }
      if (total) {
        this.datas.push([
          {
            title2: 'Total',
            items: [`${total} sq. ft.`],
          },
        ]);
      }
      this.isEmptyData.emit(this.datas.length === 0);
    }
  }
}
