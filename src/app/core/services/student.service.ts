import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiUrl = `${environment.apiUrl}/students`;

    constructor(private http: HttpClient) {}

    getStudents(params?: {start?: number; limit?: number }): Observable<Student[]> {
        let httpParams = new HttpParams();

        if (params) {
            if (params.start !== undefined) {
                httpParams = httpParams.set('_start', params.start.toString());
            }
            if (params.limit !== undefined) {
                httpParams = httpParams.set('_limit', params.limit.toString());
            }
        }

        return this.http.get<Student[]>(this.apiUrl, {params: httpParams });
    }

    countStudents(): Observable<number> {
        const params = new HttpParams().set('_limit', '0');
        return this.http.get<Student[]>(this.apiUrl, {
            params,
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Student[]>) => {
                const totalCount = response.headers.get('X-Total-Count');
                return totalCount ? parseInt(totalCount, 10) : 0;
            })
        )
    }
}
