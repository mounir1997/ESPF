import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPivotModel, PivotModel } from 'app/shared/model/pivot-model.model';
import { PivotModelService } from './pivot-model.service';
import { PivotModelComponent } from './pivot-model.component';
import { PivotModelDetailComponent } from './pivot-model-detail.component';
import { PivotModelUpdateComponent } from './pivot-model-update.component';

@Injectable({ providedIn: 'root' })
export class PivotModelResolve implements Resolve<IPivotModel> {
  constructor(private service: PivotModelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPivotModel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pivotModel: HttpResponse<PivotModel>) => {
          if (pivotModel.body) {
            return of(pivotModel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PivotModel());
  }
}

export const pivotModelRoute: Routes = [
  {
    path: '',
    component: PivotModelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PivotModelDetailComponent,
    resolve: {
      pivotModel: PivotModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PivotModelUpdateComponent,
    resolve: {
      pivotModel: PivotModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PivotModelUpdateComponent,
    resolve: {
      pivotModel: PivotModelResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'espfSampleApplicationApp.pivotModel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
