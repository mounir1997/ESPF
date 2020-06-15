import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.EspfSampleApplicationUtilisateurModule)
      },
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.EspfSampleApplicationProjetModule)
      },
      {
        path: 'pivot-model',
        loadChildren: () => import('./pivot-model/pivot-model.module').then(m => m.EspfSampleApplicationPivotModelModule)
      },
      {
        path: 'pivot-societe',
        loadChildren: () => import('./pivot-societe/pivot-societe.module').then(m => m.EspfSampleApplicationPivotSocieteModule)
      },
      {
        path: 'espf',
        loadChildren: () => import('./espf/espf.module').then(m => m.EspfSampleApplicationESPFModule)
      },
      {
        path: 'valeur-champ',
        loadChildren: () => import('./valeur-champ/valeur-champ.module').then(m => m.EspfSampleApplicationValeurChampModule)
      },
      {
        path: 'ligne-espf',
        loadChildren: () => import('./ligne-espf/ligne-espf.module').then(m => m.EspfSampleApplicationLigneESPFModule)
      },
      {
        path: 'champs',
        loadChildren: () => import('./champs/champs.module').then(m => m.EspfSampleApplicationChampsModule)
      },
      {
        path: 'attribut',
        loadChildren: () => import('./attribut/attribut.module').then(m => m.EspfSampleApplicationAttributModule)
      },
      {
        path: 'valeurs',
        loadChildren: () => import('./valeurs/valeurs.module').then(m => m.EspfSampleApplicationValeursModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EspfSampleApplicationEntityModule {}
