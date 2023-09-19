import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

//import 'rxjs/add/observable/interval';
import { environment } from 'src/environments/environment';
import { Result } from '../model/config';
@Injectable({
    providedIn: 'root'
})
export class HttpConnectionService {
    apiEndPoints;
    cachedUsers!: Observable<Result[]>;
    constructor(
        private httpClient: HttpClient,

    ) {
        this.apiEndPoints = environment.dialectUrl;

    }
    /*getApiUrl(path: string): string {
        return location.hostname === "localhost" ?  '/api':'https://localhost:8000'
    }*/

    get(path: string): Observable<any> {
        console.log("test get", this.apiEndPoints + path)
        return this.httpClient.get( this.apiEndPoints+ path, { withCredentials: true });
    }

    post(path: string, data: any): Observable<any> {
        console.log("test post", this.apiEndPoints + path)

      //  const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
       
       
        console.log("test posted", this.apiEndPoints + path)
        return this.httpClient.post<any>( this.apiEndPoints + path, data, { withCredentials: true });
    }

    update(path: string, data: any): Observable<any> {
        return this.httpClient.put( this.apiEndPoints+ path, data, { withCredentials: true });
    }

    delete(path: string, id: any): Observable<any> {
        return this.httpClient.delete( this.apiEndPoints + path, { withCredentials: true });
    }
    msgGet(path: string): Observable<any> {
        return this.httpClient.get( this.apiEndPoints + path, { responseType: 'text', withCredentials: true });
    }

    getSubmissionList():Observable<Result[]> {
        if (!this.cachedUsers) {
            this.cachedUsers = this.httpClient.get(this.apiEndPoints + '/submissions/list/').pipe(
              map((response: any) => response.results),
              shareReplay(1)
            );
          }
          return this.cachedUsers;
    }
}