import { Component } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'my-canary-ui';

  constructor(public eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.initEngagement();
  }

  doBeforeUnload(): void {
    this.eventService.newEventWhenClose();
  }

  clickLink(name: string) {
    this.eventService.newClickEvent(name, 'LINK_CLICK');
  }
}
