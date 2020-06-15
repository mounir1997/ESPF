import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChamps, Champs } from 'app/shared/model/champs.model';
import { ChampsService } from './champs.service';
import { ChampsComponent } from './champs.component';
import { ChampsDetailComponent } from './champs-detail.component';
import { ChampsUpdateComponent } from './champs-update.component';

@Injectable({ providedIn: 'root' })
export class ChampsResolve implements Resolve<IChamps> {
  constructor(private service: ChampsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChamps> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((champs: HttpResponse<Champs>) => {
          if (champs.body) {
            return of(champs.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Champs());
  }
}

export const champsRoute: Routes = [
  {
    path: '',
    component: ChampsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.champs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChampsDetailComponent,
    resolve: {
      champs: ChampsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.champs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChampsUpdateComponent,
    resolve: {
      champs: ChampsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.champs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChampsUpdateComponent,
    resolve: {
      champs: ChampsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.champs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
