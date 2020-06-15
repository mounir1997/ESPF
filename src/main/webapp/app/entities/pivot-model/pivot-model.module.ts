import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PivotModelComponent } from './pivot-model.component';
import { PivotModelDetailComponent } from './pivot-model-detail.component';
import { PivotModelUpdateComponent } from './pivot-model-update.component';
import { PivotModelDeleteDialogComponent } from './pivot-model-delete-dialog.component';
import { pivotModelRoute } from './pivot-model.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(pivotModelRoute)],
  declarations: [PivotModelComponent, PivotModelDetailComponent, PivotModelUpdateComponent, PivotModelDeleteDialogComponent],
  entryComponents: [PivotModelDeleteDialogComponent]
})
export class EspfSampleApplicationPivotModelModule {}
