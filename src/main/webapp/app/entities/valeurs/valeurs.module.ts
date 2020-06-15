import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ValeursComponent } from './valeurs.component';
import { ValeursDetailComponent } from './valeurs-detail.component';
import { ValeursUpdateComponent } from './valeurs-update.component';
import { ValeursDeleteDialogComponent } from './valeurs-delete-dialog.component';
import { valeursRoute } from './valeurs.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(valeursRoute)],
  declarations: [ValeursComponent, ValeursDetailComponent, ValeursUpdateComponent, ValeursDeleteDialogComponent],
  entryComponents: [ValeursDeleteDialogComponent]
})
export class EspfSampleApplicationValeursModule {}
