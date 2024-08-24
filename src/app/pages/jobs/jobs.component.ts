import { Component, OnInit } from '@angular/core';

import { JobsSserviceService } from './jobs-sservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent implements OnInit {
  // private subscription: Subscription;

  jobs: any[] = [];
  rightColData: any;
  matCardActive: number = 0;

  constructor(
    private jobsServer: JobsSserviceService,
    private router: Router,
    private server: ServerService
  ) {}

  ngOnInit(): void {
    this.FetchJobsData();
    this.getById({ job_id: 1 });

    this.server.callFunction$.subscribe((e: any) => {
      this.onSearchEnter(e);
    });
  }

  FetchJobsData() {
    this.jobsServer.getJSONJobsData().subscribe((data: any) => {
      this.jobs = data.jobs;
      console.log(this.jobs);
    });
  }

  getById(e: any) {
    console.log(e.job_id);
    this.jobsServer.getJobById(e.job_id).subscribe((data: any) => {
      console.log(data);
      this.rightColData = data;
    });
  }

  applyClick(e: any) {
    console.log(e);
    // this.router.navigate(['/e.apply_link']);
    window.open(`${e.apply_link}`, '_blank');
  }

  // *****************
  rightColCardEvent(e: any) {
    this.matCardActive = e;
    console.log(e);
  }

  onSearchEnter(e: any) {
    console.log(e, 'search value');
    let searchValue = e.target.value;
    if (searchValue) {
      this.jobs = this.jobs.filter((item: any) => {
        return item.title.toLowerCase().includes(searchValue);
      });
    } else {
      this.FetchJobsData();
    }

    console.log(this.jobs);
  }
}
