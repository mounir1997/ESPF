import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PivotSocieteComponent } from './pivot-societe.component';
import { PivotSocieteDetailComponent } from './pivot-societe-detail.component';
import { PivotSocieteUpdateComponent } from './pivot-societe-update.component';
import { PivotSocieteDeleteDialogComponent } from './pivot-societe-delete-dialog.component';
import { pivotSocieteRoute } from './pivot-societe.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(pivotSocieteRoute)],
  declarations: [PivotSocieteComponent, PivotSocieteDetailComponent, PivotSocieteUpdateComponent, PivotSocieteDeleteDialogComponent],
  entryComponents: [PivotSocieteDeleteDialogComponent]
})
export class EspfSampleApplicationPivotSocieteModule {}
