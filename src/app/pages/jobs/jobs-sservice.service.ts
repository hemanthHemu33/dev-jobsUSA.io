import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsSserviceService {
  constructor(private http: HttpClient) {}

  url = 'assets/jobsData.json';

  getJSONJobsData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  getJobById(id: any): Observable<any> {
    return this.getJSONJobsData().pipe(
      map((response: any) => {
        const job = response.jobs.find((job: any) => job.job_id == id);
        return job;
      })
    );
  }
}
