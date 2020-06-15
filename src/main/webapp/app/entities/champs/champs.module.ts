import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ChampsComponent } from './champs.component';
import { ChampsDetailComponent } from './champs-detail.component';
import { ChampsUpdateComponent } from './champs-update.component';
import { ChampsDeleteDialogComponent } from './champs-delete-dialog.component';
import { champsRoute } from './champs.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(champsRoute)],
  declarations: [ChampsComponent, ChampsDetailComponent, ChampsUpdateComponent, ChampsDeleteDialogComponent],
  entryComponents: [ChampsDeleteDialogComponent]
})
export class EspfSampleApplicationChampsModule {}
