import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IValeurChamp, ValeurChamp } from 'app/shared/model/valeur-champ.model';
import { ValeurChampService } from './valeur-champ.service';
import { ValeurChampComponent } from './valeur-champ.component';
import { ValeurChampDetailComponent } from './valeur-champ-detail.component';
import { ValeurChampUpdateComponent } from './valeur-champ-update.component';

@Injectable({ providedIn: 'root' })
export class ValeurChampResolve implements Resolve<IValeurChamp> {
  constructor(private service: ValeurChampService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IValeurChamp> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((valeurChamp: HttpResponse<ValeurChamp>) => {
          if (valeurChamp.body) {
            return of(valeurChamp.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ValeurChamp());
  }
}

export const valeurChampRoute: Routes = [
  {
    path: '',
    component: ValeurChampComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurChamp.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ValeurChampDetailComponent,
    resolve: {
      valeurChamp: ValeurChampResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurChamp.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ValeurChampUpdateComponent,
    resolve: {
      valeurChamp: ValeurChampResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurChamp.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ValeurChampUpdateComponent,
    resolve: {
      valeurChamp: ValeurChampResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurChamp.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
