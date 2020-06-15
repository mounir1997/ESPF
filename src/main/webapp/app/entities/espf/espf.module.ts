import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ESPFComponent } from './espf.component';
import { ESPFDetailComponent } from './espf-detail.component';
import { ESPFUpdateComponent } from './espf-update.component';
import { ESPFDeleteDialogComponent } from './espf-delete-dialog.component';
import { eSPFRoute } from './espf.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(eSPFRoute)],
  declarations: [ESPFComponent, ESPFDetailComponent, ESPFUpdateComponent, ESPFDeleteDialogComponent],
  entryComponents: [ESPFDeleteDialogComponent]
})
export class EspfSampleApplicationESPFModule {}
