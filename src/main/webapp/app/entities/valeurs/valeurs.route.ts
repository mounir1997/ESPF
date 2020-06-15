import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IValeurs, Valeurs } from 'app/shared/model/valeurs.model';
import { ValeursService } from './valeurs.service';
import { ValeursComponent } from './valeurs.component';
import { ValeursDetailComponent } from './valeurs-detail.component';
import { ValeursUpdateComponent } from './valeurs-update.component';

@Injectable({ providedIn: 'root' })
export class ValeursResolve implements Resolve<IValeurs> {
  constructor(private service: ValeursService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IValeurs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((valeurs: HttpResponse<Valeurs>) => {
          if (valeurs.body) {
            return of(valeurs.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Valeurs());
  }
}

export const valeursRoute: Routes = [
  {
    path: '',
    component: ValeursComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ValeursDetailComponent,
    resolve: {
      valeurs: ValeursResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ValeursUpdateComponent,
    resolve: {
      valeurs: ValeursResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ValeursUpdateComponent,
    resolve: {
      valeurs: ValeursResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.valeurs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
