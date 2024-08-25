import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsSserviceService } from '../jobs/jobs-sservice.service';

@Component({
  selector: 'app-jobs-mobile',
  templateUrl: './jobs-mobile.component.html',
  styleUrl: './jobs-mobile.component.scss',
})
export class JobsMobileComponent implements OnInit {
  paramId: any;
  rightColData: any;
  constructor(
    private location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private jobsServer: JobsSserviceService
  ) {}

  ngOnInit(): void {
    this.paramId = this.activeRouter.snapshot.queryParamMap.get('job_id');
    // console.log(this.paramId, 'paramId');
    this.getById(this.paramId);
  }

  back() {
    this.location.back();
  }

  getById(e: any) {
    // console.log(e.job_id);
    this.jobsServer.getJobById(e).subscribe((data: any) => {
      // console.log(data);
      this.rightColData = data;
    });
  }
  applyClick(e: any) {
    // console.log(e);
    // this.router.navigate(['/e.apply_link']);
    window.open(`${e.apply_link}`, '_blank');
  }
}
