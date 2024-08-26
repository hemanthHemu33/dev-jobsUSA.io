import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';

import { JobsSserviceService } from './jobs-sservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  innerWidth: number | undefined;
  originalJobs: any[] = [];
  // private subscription: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  jobs: any[] = [];
  rightColData: any;
  matCardActive: number = 0;

  constructor(
    private jobsServer: JobsSserviceService,
    private router: Router,
    private server: ServerService,
    private cdr: ChangeDetectorRef
  ) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.FetchJobsData();
    this.server.callFunction$.subscribe((e: any) => {
      this.onSearchEnter(e);
    });
  }

  FetchJobsData() {
    this.jobsServer.getJSONJobsData().subscribe((data: any) => {
      this.jobs = data.jobs;
      this.jobs.sort(
        (a, b) =>
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
      );
      this.originalJobs = [...data.jobs];

      this.getById({ job_id: this.jobs[0].job_id });
      this.cdr.detectChanges();
    });
  }

  getById(e: any) {
    // console.log(e.job_id);
    this.jobsServer.getJobById(e.job_id).subscribe((data: any) => {
      // console.log(data);
      this.rightColData = data;
      this.cdr.detectChanges();
    });
  }

  applyClick(e: any) {
    // console.log(e);
    // this.router.navigate(['/e.apply_link']);
    window.open(`${e.apply_link}`, '_blank');
    this.cdr.detectChanges();
  }

  // *****************
  rightColCardEvent(e: any) {
    this.matCardActive = e;
    // console.log(e);
  }

  onSearchEnter(e: any) {
    let searchValue = e?.trim().toLowerCase();
    console.log('Search Value:', searchValue);

    if (searchValue) {
      this.jobs = this.originalJobs.filter((item: any) => {
        const title = item.title?.toLowerCase();
        return title.includes(searchValue);
      });
      console.log('Filtered Jobs:', this.jobs);
    } else {
      this.jobs = [...this.originalJobs]; // Reset to original job list
      console.log('No search value, fetching all jobs.');
    }
    this.cdr.detectChanges();
  }
  // *******************************MOBILE********************************
  mobileCardJobById(e: any) {
    this.router.navigate(['jobs/jobsMobile'], {
      queryParams: { job_id: e.job_id },
    });
  }
}
