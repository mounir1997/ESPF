import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ValeurChampComponent } from './valeur-champ.component';
import { ValeurChampDetailComponent } from './valeur-champ-detail.component';
import { ValeurChampUpdateComponent } from './valeur-champ-update.component';
import { ValeurChampDeleteDialogComponent } from './valeur-champ-delete-dialog.component';
import { valeurChampRoute } from './valeur-champ.route';

@NgModule({
  imports: [EspfSampleApplicationSharedModule, RouterModule.forChild(valeurChampRoute)],
  declarations: [ValeurChampComponent, ValeurChampDetailComponent, ValeurChampUpdateComponent, ValeurChampDeleteDialogComponent],
  entryComponents: [ValeurChampDeleteDialogComponent]
})
export class EspfSampleApplicationValeurChampModule {}
