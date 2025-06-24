import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.scss'],
    standalone: false
})
export class ShareDialogComponent implements OnInit {
  title = 'Share';
  public href: string = '';
  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.href = window.location.href;
  }

  doNo(): void {
    this.dialogRef.close(false);
  }

  clickButton(name: string) {
    this.eventService.newClickEvent(name);
  }
}
