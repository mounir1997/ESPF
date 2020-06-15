import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IESPF, ESPF } from 'app/shared/model/espf.model';
import { ESPFService } from './espf.service';
import { ESPFComponent } from './espf.component';
import { ESPFDetailComponent } from './espf-detail.component';
import { ESPFUpdateComponent } from './espf-update.component';

@Injectable({ providedIn: 'root' })
export class ESPFResolve implements Resolve<IESPF> {
  constructor(private service: ESPFService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IESPF> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((eSPF: HttpResponse<ESPF>) => {
          if (eSPF.body) {
            return of(eSPF.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ESPF());
  }
}

export const eSPFRoute: Routes = [
  {
    path: '',
    component: ESPFComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.eSPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ESPFDetailComponent,
    resolve: {
      eSPF: ESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.eSPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ESPFUpdateComponent,
    resolve: {
      eSPF: ESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.eSPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ESPFUpdateComponent,
    resolve: {
      eSPF: ESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.eSPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
