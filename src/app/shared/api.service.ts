import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postBook(data: any) {
    return this.http.post<any>("http://localhost:3000", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getBooks() {
    return this.http.get<any>("http://localhost:3000")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateBook(data: any, _id: number) {
    return this.http.put<any>("http://localhost:3000/" + _id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteBook(_id: number) {
    return this.http.delete<any>("http://localhost:3000/" + _id)
      .pipe(map((res) => {
        if (res.status == 200){
          alert('hello mother ')
        }
        return res;
      }))
  }

}
