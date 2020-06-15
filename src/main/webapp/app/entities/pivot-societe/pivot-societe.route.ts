import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPivotSociete, PivotSociete } from 'app/shared/model/pivot-societe.model';
import { PivotSocieteService } from './pivot-societe.service';
import { PivotSocieteComponent } from './pivot-societe.component';
import { PivotSocieteDetailComponent } from './pivot-societe-detail.component';
import { PivotSocieteUpdateComponent } from './pivot-societe-update.component';

@Injectable({ providedIn: 'root' })
export class PivotSocieteResolve implements Resolve<IPivotSociete> {
  constructor(private service: PivotSocieteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPivotSociete> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pivotSociete: HttpResponse<PivotSociete>) => {
          if (pivotSociete.body) {
            return of(pivotSociete.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PivotSociete());
  }
}

export const pivotSocieteRoute: Routes = [
  {
    path: '',
    component: PivotSocieteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotSociete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PivotSocieteDetailComponent,
    resolve: {
      pivotSociete: PivotSocieteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotSociete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PivotSocieteUpdateComponent,
    resolve: {
      pivotSociete: PivotSocieteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotSociete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PivotSocieteUpdateComponent,
    resolve: {
      pivotSociete: PivotSocieteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotSociete.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
