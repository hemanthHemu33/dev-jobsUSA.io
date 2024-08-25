import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobsMobileComponent } from './pages/jobs-mobile/jobs-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
  },
  {
    path: 'jobs',
    component: JobsComponent,
    pathMatch: 'full',
  },
  {
    path: 'jobs/jobsMobile',
    component: JobsMobileComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
