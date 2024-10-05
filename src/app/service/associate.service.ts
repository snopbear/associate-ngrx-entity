import { Injectable } from '@angular/core';
import { IAssociates } from '../model/associates';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  baseurl = 'http://localhost:3000/associate';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IAssociates[]>(this.baseurl);
  }

  getByCode(code: number) {
    return this.http.get<IAssociates>(this.baseurl + '/' + code);
  }
  delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  update(data: IAssociates) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  create(data: IAssociates) {
    return this.http.post(this.baseurl, data);
  }
}
