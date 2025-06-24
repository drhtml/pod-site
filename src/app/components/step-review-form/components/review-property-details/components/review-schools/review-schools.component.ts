import { Component, Input, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { ISchoolDetail } from 'src/app/interfaces/ISchoolDetailResponse';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-review-schools',
    templateUrl: './review-schools.component.html',
    styleUrls: ['./review-schools.component.scss'],
    standalone: false
})
export class ReviewSchoolsComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  datas: ISchoolDetail[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.datas = (this.propertyData.schools || []).map((item) => {
        return {
          InstitutionName: item.name,
          gradelevel1lotext: '',
          gradelevel1hitext: '',
          gradelevel1: item.grades,
          GSTestRating: `${item.overallGrade}`,
          distance: item.distances,
          students: item.students,
          isGoodGrade: item.overallGrade >= 7,
        };
      });
    }
  }

  clickLink(name: string) {
    this.eventService.newClickEvent(name, 'LINK_CLICK');
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }
}
