import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, forkJoin, map, of } from 'rxjs';
import { LOCAL_STORAGE_PROPERTY_INFO } from 'src/constant';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { IResponsePhotoSuccess } from '../interfaces/backendResponse/IResponsePhoto';
import { IFetchPropertySuccess } from '../interfaces/backendResponse/IResponseProperty';
import { networkError } from '../utils/network';
import {
  getFileNameWithExtension,
  getFileNameWithoutExtension,
} from '../utils/string';
import { EventService } from './event.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  bkPropertyInfo = new BehaviorSubject<IFetchPropertySuccess | null>(null);

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private eventService: EventService
  ) {
    const cachePropertyInfo = localStorage.getItem(LOCAL_STORAGE_PROPERTY_INFO);
    if (cachePropertyInfo) {
      this.bkPropertyInfo.next(JSON.parse(cachePropertyInfo));
    }
  }

  fetchPropertyInfo(id: string) {
    this.loadingService.start();
    return forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        propertyInfo: this.http
          .get<IFetchPropertySuccess | IFailRequest>(
            `${environment.mycanaryBackendApi}/pod/property/${id}`
          )
          .pipe(networkError),
        photos: this.http
          .get<IResponsePhotoSuccess[] | IFailRequest>(
            `${environment.mycanaryBackendApi}/property/${id}/images`
          )
          .pipe(networkError),
      }
    ).pipe(
      map(
        (value: {
          propertyInfo: IFetchPropertySuccess | IFailRequest;
          photos: IResponsePhotoSuccess | IFailRequest;
        }) => {
          this.loadingService.stop();
          if (value.propertyInfo.success === false) {
            const failResponse = value.propertyInfo as IFailRequest;

            return failResponse;
          }
          if (value.photos.success === false) {
            const failResponse = value.photos as IFailRequest;

            return failResponse;
          }

          const propertyInfo = value.propertyInfo as IFetchPropertySuccess;
          localStorage.setItem(
            LOCAL_STORAGE_PROPERTY_INFO,
            JSON.stringify(propertyInfo)
          );
          this.eventService.bkPropertyId = propertyInfo.data._id;
          this.eventService.bkPricePointId = propertyInfo.data.plan?._id || '';

          const photos = value.photos as IResponsePhotoSuccess;
          propertyInfo.data.photos = photos.data.map((photo) => {
            return {
              ...photo,
              name: getFileNameWithoutExtension(photo.fileName),
              nameWithExtension: getFileNameWithExtension(photo.fileName),
            };
          });
          this.bkPropertyInfo.next(propertyInfo);
          return propertyInfo;
        }
      )
    );
  }
}
