import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { StepReviewFormModule } from 'src/app/components/step-review-form/step-review-form.module';
import { SummaryRightComponent } from './summary-right/summary-right.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { SummaryTopComponent } from './summary-top/summary-top.component';
import { ShareDialogModule } from 'src/app/components/share-dialog/share-dialog.module';

@NgModule({
  declarations: [HomeComponent, SummaryRightComponent, SummaryTopComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StepReviewFormModule,
    ButtonModule,
    ShareDialogModule,
  ],
})
export class HomeModule {}
