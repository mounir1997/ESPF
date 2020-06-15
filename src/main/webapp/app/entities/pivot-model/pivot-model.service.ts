import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPivotModel } from 'app/shared/model/pivot-model.model';

type EntityResponseType = HttpResponse<IPivotModel>;
type EntityArrayResponseType = HttpResponse<IPivotModel[]>;

@Injectable({ providedIn: 'root' })
export class PivotModelService {
  public resourceUrl = SERVER_API_URL + 'api/pivot-models';

  constructor(protected http: HttpClient) {}

  create(pivotModel: IPivotModel): Observable<EntityResponseType> {
    return this.http.post<IPivotModel>(this.resourceUrl, pivotModel, { observe: 'response' });
  }

  update(pivotModel: IPivotModel): Observable<EntityResponseType> {
    return this.http.put<IPivotModel>(this.resourceUrl, pivotModel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPivotModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPivotModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
