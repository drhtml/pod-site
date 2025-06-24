import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIResponseProperty,
  IFetchPropertySuccess,
  IResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { EventService } from 'src/app/services/event.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent extends AutoUnsubscribeComponent implements OnInit, OnDestroy {
  propertyId: string = '';
  propertyData: IResponseProperty = _.cloneDeep(emptyIResponseProperty);
  name = '';
  isSentViewPropertyEvent = false;
  totalSecondsOnPoint = 0;
  private interval30SecondsOnPoint: ReturnType<typeof setInterval> | undefined;

  constructor(
    private route: ActivatedRoute,
    public propertyService: PropertyService,
    public eventService: EventService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.route.paramMap.subscribe((paramMap) => {
        this.propertyId = paramMap.get('id') as string;
      })
    );
    if (this.eventService.canSendEventNow.value) {
      this.checkToSendViewPropertyEvent();
    } else {
      this.addSubscriptions(
        this.eventService.canSendEventNow.subscribe((canSendEventNow) => {
          if (canSendEventNow) {
            this.checkToSendViewPropertyEvent();
          }
        })
      );
    }

    if (this.propertyId) {
      this.addSubscriptions(
        this.propertyService
          .fetchPropertyInfo(this.propertyId)
          .subscribe((rs) => {
            if (rs.success === false) {
              const failResponse = rs as IFailRequest;
              this._snackBar.open(failResponse.message, 'CLOSE', {
                verticalPosition: 'top',
                panelClass: 'error',
                duration: 3000,
              });
            } else {
              const successResponse = rs as IFetchPropertySuccess;
              this.propertyData = successResponse.data;
              this.name = this.propertyData.name;
              this.checkToSendViewPropertyEvent();
            }
          })
      );
    }

    this.interval30SecondsOnPoint = setInterval(() => {
      if (!this.isSentViewPropertyEvent) {
        return;
      }

      if (this.eventService.new30_SECONDS_ON_POINTEvent()) {
        this.totalSecondsOnPoint += 30;
      }
      if (this.totalSecondsOnPoint === 90) {
        clearInterval(this.interval30SecondsOnPoint);
      }
    }, 3000);
  }

  checkToSendViewPropertyEvent() {
    if (this.isSentViewPropertyEvent) {
      return;
    }
    this.isSentViewPropertyEvent = this.eventService.newViewPropertyEvent();
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

  override ngOnDestroy() {
    if (this.interval30SecondsOnPoint) {
      clearInterval(this.interval30SecondsOnPoint);
    }
    super.ngOnDestroy();
  }
}
