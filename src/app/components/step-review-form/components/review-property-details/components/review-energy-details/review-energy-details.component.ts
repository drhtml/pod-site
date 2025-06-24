import { Component, Input, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';

@Component({
    selector: 'app-review-energy-details',
    templateUrl: './review-energy-details.component.html',
    styleUrls: ['./review-energy-details.component.scss'],
    standalone: false
})
export class ReviewEnergyDetailsComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  electricInformation = '';
  sewerInformation = '';
  waterInformation = '';
  utilitiesForProperty: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
