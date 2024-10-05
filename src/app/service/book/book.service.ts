import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../../store/book/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseurl = 'http://localhost:3000/book';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IBook[]>(this.baseurl);
  }

  getByCode(code: number) {
    return this.http.get<IBook>(this.baseurl + '/' + code);
  }
  delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  update(data: IBook) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  create(data: IBook) {
    return this.http.post(this.baseurl, data);
  }
}
