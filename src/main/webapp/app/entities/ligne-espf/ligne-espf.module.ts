import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { LigneESPFComponent } from './ligne-espf.component';
import { LigneESPFDetailComponent } from './ligne-espf-detail.component';
import { LigneESPFUpdateComponent } from './ligne-espf-update.component';
import { LigneESPFDeleteDialogComponent } from './ligne-espf-delete-dialog.component';
import { ligneESPFRoute } from './ligne-espf.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(ligneESPFRoute)],
  declarations: [LigneESPFComponent, LigneESPFDetailComponent, LigneESPFUpdateComponent, LigneESPFDeleteDialogComponent],
  entryComponents: [LigneESPFDeleteDialogComponent]
})
export class EspfSampleApplicationLigneESPFModule {}
