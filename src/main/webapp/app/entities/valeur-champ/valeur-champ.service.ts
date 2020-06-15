import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IValeurChamp } from 'app/shared/model/valeur-champ.model';

type EntityResponseType = HttpResponse<IValeurChamp>;
type EntityArrayResponseType = HttpResponse<IValeurChamp[]>;

@Injectable({ providedIn: 'root' })
export class ValeurChampService {
  public resourceUrl = SERVER_API_URL + 'api/valeur-champs';

  constructor(protected http: HttpClient) {}

  create(valeurChamp: IValeurChamp): Observable<EntityResponseType> {
    return this.http.post<IValeurChamp>(this.resourceUrl, valeurChamp, { observe: 'response' });
  }

  update(valeurChamp: IValeurChamp): Observable<EntityResponseType> {
    return this.http.put<IValeurChamp>(this.resourceUrl, valeurChamp, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IValeurChamp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IValeurChamp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
