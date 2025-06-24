import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRequestLead } from '../interfaces/backendRequest/IRequestLead';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { ISuccessRequest } from '../interfaces/backendResponse/ISuccessRequest';
import { networkError } from '../utils/network';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  newLead(body: IRequestLead) {
    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/lead`,
        body
      )
      .pipe(networkError)
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }
}
