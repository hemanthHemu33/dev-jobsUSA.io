import { Component, NgZone, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  queryField = new FormControl();
  constructor(private sharedService: ServerService, private zone: NgZone) {}
  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.zone.run(() =>
            this.sharedService.triggerFunctionCall(value)
          );
        })
      )
      .subscribe(
        (results) => {
          console.log(results);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  redirectToInstagram() {
    window.open('https://www.instagram.com/job_posters_usa/', '_blank');
  }
  // onSearchEnter(e: any) {
  //   console.log('search', e.target.value);
  //   this.sharedService.triggerFunctionCall(e);
  // }
}
