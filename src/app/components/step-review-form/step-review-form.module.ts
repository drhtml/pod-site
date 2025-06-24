import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepReviewFormComponent } from './step-review-form.component';
import { ReviewPropertyDetailsComponent } from './components/review-property-details/review-property-details.component';
import { ReviewEnergyDetailsComponent } from './components/review-property-details/components/review-energy-details/review-energy-details.component';
import { ReviewFieldSectionComponent } from './components/review-property-details/components/review-field-section/review-field-section.component';
import { ReviewFloorPlansComponent } from './components/review-property-details/components/review-floor-plans/review-floor-plans.component';
import { ReviewInteriorDetailsComponent } from './components/review-property-details/components/review-interior-details/review-interior-details.component';
import { ReviewPriceEvolutionComponent } from './components/review-property-details/components/review-price-evolution/review-price-evolution.component';
import { ReviewPropertyHeaderComponent } from './components/review-property-details/components/review-property-header/review-property-header.component';
import { ReviewPropertySubDetailsComponent } from './components/review-property-details/components/review-property-sub-details/review-property-sub-details.component';
import { ReviewRecentImprovementsComponent } from './components/review-property-details/components/review-recent-improvements/review-recent-improvements.component';
import { ReviewRecentTickerComponent } from './components/review-property-details/components/review-recent-ticker/review-recent-ticker.component';
import { ReviewSchoolsComponent } from './components/review-property-details/components/review-schools/review-schools.component';
import { ButtonModule } from '../button/button.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { DividerModule } from '../divider/divider.module';
import { MonthlyPaymentModule } from '../monthly-payment/monthly-payment.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SwiperModule } from 'swiper/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShareDialogModule } from '../share-dialog/share-dialog.module';

@NgModule({
  declarations: [
    StepReviewFormComponent,
    ReviewPropertyDetailsComponent,
    ReviewPropertyHeaderComponent,
    ReviewFloorPlansComponent,
    ReviewInteriorDetailsComponent,
    ReviewPropertySubDetailsComponent,
    ReviewRecentImprovementsComponent,
    ReviewSchoolsComponent,
    ReviewPriceEvolutionComponent,
    ReviewEnergyDetailsComponent,
    ReviewFieldSectionComponent,
    ReviewRecentTickerComponent,
  ],
  exports: [StepReviewFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    LineChartModule,
    MatExpansionModule,
    DividerModule,
    MonthlyPaymentModule,
    MatTabsModule,
    SwiperModule,
    MatProgressSpinnerModule,
    ShareDialogModule,
  ],
})
export class StepReviewFormModule {}
