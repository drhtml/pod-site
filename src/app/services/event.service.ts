import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { LOCAL_STORAGE_ENGAGEMENT_INFO } from 'src/constant';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { IResponseEngagementSuccess } from '../interfaces/backendResponse/IResponseEngagementSuccess';
import {
  emptyIEngagementInfo,
  IEngagementInfo,
} from '../interfaces/IEngagementInfo';
import { networkError } from '../utils/network';
import { LoadingService } from './loading.service';

type IEventType =
  | 'SESSION_ENDED'
  | 'BUTTON_CLICK'
  | 'LINK_CLICK'
  | 'PROPERTY_VIEWED'
  | '30_SECONDS_ON_POINT';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  engagementInfo: IEngagementInfo = emptyIEngagementInfo;
  canSendEventNow = new BehaviorSubject<boolean>(false);
  bkIPAddress = '';
  bkPropertyId = '';
  bkPricePointId = '';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    if (localStorage.getItem(LOCAL_STORAGE_ENGAGEMENT_INFO)) {
      const engagementInfo: IEngagementInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_ENGAGEMENT_INFO) || '{}'
      );
      this.bkIPAddress = engagementInfo.ipAddress;
    }
  }

  initEngagement() {
    if (this.engagementInfo._id && this.engagementInfo.ipAddress) {
      this.canSendEventNow.next(true);
      return;
    }
    if (!this.engagementInfo._id) {
      this.createEngagement().subscribe();
    } else if (!this.engagementInfo.ipAddress) {
      this.fetchEngagement().subscribe();
    }
  }

  private createEngagement() {
    this.loadingService.start();
    return this.http
      .post<IResponseEngagementSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/engagement/session`,
        null
      )
      .pipe(networkError)
      .pipe(
        switchMap((value: any) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IResponseEngagementSuccess;
            try {
              this.engagementInfo = {
                _id: successResponse.data,
                ipAddress: '',
              };
              localStorage.setItem(
                LOCAL_STORAGE_ENGAGEMENT_INFO,
                JSON.stringify(this.engagementInfo)
              );
            } catch (Error) {}

            return this.fetchEngagement();
          }
          return Promise.resolve(value);
        })
      );
  }

  private fetchEngagement() {
    this.loadingService.start();
    return this.http
      .get<{
        IPv4: string;
      }>(`https://geolocation-db.com/json/`)
      .pipe(networkError)
      .pipe(
        map((value) => {
          this.loadingService.stop();
          if (value.success !== false) {
            this.engagementInfo = {
              _id: this.engagementInfo._id,
              ipAddress: value.IPv4,
            };
            localStorage.setItem(
              LOCAL_STORAGE_ENGAGEMENT_INFO,
              JSON.stringify(this.engagementInfo)
            );
            this.canSendEventNow.next(true);
            return this.engagementInfo;
          } else {
            this.engagementInfo.ipAddress = this.bkIPAddress;
          }
          return value;
        })
      );
  }

  newBaseEvent(data: { key: IEventType; data: any }) {
    if (!this.engagementInfo._id) {
      return false;
    }
    this.http
      .post<IResponseEngagementSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/engagement/session/${this.engagementInfo._id}/event`,
        data
      )
      .pipe(networkError)
      .subscribe();
    return true;
  }

  newViewPropertyEvent() {
    if (
      !this.engagementInfo._id ||
      !this.bkPropertyId ||
      !this.bkPricePointId
    ) {
      return false;
    }
    return this.newBaseEvent({
      key: 'PROPERTY_VIEWED',
      data: {
        PROPERTY_ID: this.bkPropertyId,
        PRICE_POINT_ID: this.bkPricePointId,
      },
    });
  }

  newEventWhenClose() {
    if (!this.engagementInfo._id) {
      return;
    }
    fetch(
      `${environment.mycanaryBackendApi}/engagement/session/${this.engagementInfo._id}/event`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'SESSION_ENDED',
          data: {
            dateTime: new Date(),
            ipAddress: this.engagementInfo.ipAddress,
          },
        }),
        keepalive: true,
      }
    );
  }

  newClickEvent(buttonName: string, key: IEventType = 'BUTTON_CLICK') {
    return this.newBaseEvent({
      key,
      data: {
        dateTime: new Date(),
        ipAddress: this.engagementInfo.ipAddress,
        buttonName: buttonName,
      },
    });
  }

  new30_SECONDS_ON_POINTEvent(key: IEventType = '30_SECONDS_ON_POINT') {
    return this.newBaseEvent({
      key,
      data: {
        dateTime: new Date(),
        ipAddress: this.engagementInfo.ipAddress,
      },
    });
  }
}
