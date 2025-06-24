import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-bottom-links',
    templateUrl: './bottom-links.component.html',
    styleUrls: ['./bottom-links.component.scss'],
    standalone: false
})
export class BottomLinksComponent implements OnInit {
  constructor(public eventService: EventService) {}

  ngOnInit(): void {}

  clickLink(name: string) {
    this.eventService.newClickEvent(name, 'LINK_CLICK');
  }
}
