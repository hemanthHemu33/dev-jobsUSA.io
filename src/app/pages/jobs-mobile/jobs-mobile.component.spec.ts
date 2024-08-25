import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsMobileComponent } from './jobs-mobile.component';

describe('JobsMobileComponent', () => {
  let component: JobsMobileComponent;
  let fixture: ComponentFixture<JobsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
