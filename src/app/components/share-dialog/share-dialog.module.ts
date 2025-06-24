import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDialogComponent } from './share-dialog.component';
import { ButtonModule } from '../button/button.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [ShareDialogComponent],
  exports: [ShareDialogComponent],
  imports: [CommonModule, ButtonModule, ShareButtonsModule, ShareIconsModule],
})
export class ShareDialogModule {}
