import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import {
  IResponseProperty,
  emptyIResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';
import { EventService } from 'src/app/services/event.service';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { ReviewPropertyDetailsComponent } from './components/review-property-details/review-property-details.component';

@Component({
    selector: 'app-step-review-form',
    templateUrl: './step-review-form.component.html',
    styleUrls: ['./step-review-form.component.scss'],
    standalone: false
})
export class StepReviewFormComponent implements OnInit, OnChanges {
  @Input() showShareButton = false;
  @Input() showPropertyHeaderDetail = true;
  @Output() edit = new EventEmitter();
  @Output() changeTab = new EventEmitter<number>();
  @ViewChild('propertyDetails') proDetailsRef?: ReviewPropertyDetailsComponent;
  @Input() propertyData: IResponseProperty = _.cloneDeep(
    emptyIResponseProperty
  );
  name = '';

  pricePointSummaryDatas: IPricePointSummary[] = [
    {
      price: '$180,000',
      leads: 20,
      totalScore: '$3,600K',
      isBestPricePoint: false,
      percent: '60%',
      color: '#FFFE71',
      name: 'Price Points 2',
    },
    {
      price: '$190,000',
      leads: 20,
      totalScore: '$3,800K',
      isBestPricePoint: true,
      percent: '60%',
      color: '#FCEAB8',
      name: 'Price Points 1',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '55%',
      color: '#F9D0B6',
      name: 'Price Points 3',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '80%',
      color: '#F3B1B1',
      name: 'Price Points 4',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '60%',
      color: '#A5D8D9',
      name: 'Price Points 5',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '70%',
      color: '#6DC8C9',
      name: 'Price Points 6',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '56%',
      color: '#F9D0B6',
      name: 'Price Points 7',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '100%',
      color: '#F3B1B1',
      name: 'Price Points 9',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '60%',
      color: '#A5D8D9',
      name: 'Price Points 8',
    },
    {
      price: '$200,000',
      leads: 16,
      totalScore: '$3,100K',
      isBestPricePoint: false,
      percent: '60%',
      color: '#6DC8C9',
      name: 'Price Points 10',
    },
  ];
  tabIndex = 0;

  constructor(public dialog: MatDialog, private eventService: EventService) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.name = this.propertyData.name;
    }
  }

  selectedTabChange(index: number) {
    if (index === 0) {
      this.proDetailsRef?.reloadPriceEvolutionChart();
    }
    this.changeTab.emit(index);
    this.tabIndex = index;
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }

  showShareDialog() {
    this.dialog.open(ShareDialogComponent, {
      width: '414px',
      maxWidth: 'calc(100vw - 20px)',
    });
  }
}
