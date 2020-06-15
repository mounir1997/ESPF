import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILigneESPF, LigneESPF } from 'app/shared/model/ligne-espf.model';
import { LigneESPFService } from './ligne-espf.service';
import { LigneESPFComponent } from './ligne-espf.component';
import { LigneESPFDetailComponent } from './ligne-espf-detail.component';
import { LigneESPFUpdateComponent } from './ligne-espf-update.component';

@Injectable({ providedIn: 'root' })
export class LigneESPFResolve implements Resolve<ILigneESPF> {
  constructor(private service: LigneESPFService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILigneESPF> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ligneESPF: HttpResponse<LigneESPF>) => {
          if (ligneESPF.body) {
            return of(ligneESPF.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LigneESPF());
  }
}

export const ligneESPFRoute: Routes = [
  {
    path: '',
    component: LigneESPFComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.ligneESPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LigneESPFDetailComponent,
    resolve: {
      ligneESPF: LigneESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.ligneESPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LigneESPFUpdateComponent,
    resolve: {
      ligneESPF: LigneESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.ligneESPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LigneESPFUpdateComponent,
    resolve: {
      ligneESPF: LigneESPFResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.ligneESPF.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
