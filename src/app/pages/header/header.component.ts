import { Component, OnInit } from '@angular/core';
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
  constructor(private sharedService: ServerService) {}
  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        debounceTime(200), // Waits for the user to stop typing for 300ms
        distinctUntilChanged(), // Only calls the API if the value has actually changed
        switchMap((value) => this.sharedService.triggerFunctionCall(value))
      )
      .subscribe(
        (results) => {
          // Handle the results from the API
          console.log(results);
        },
        (error) => {
          // Handle errors from the API
          console.error(error);
        }
      );
  }
  // onBlur(e: any) {
  //   const value = e.target.value;
  //   console.log('Results after blur:', value);

  //   if (value) {
  //     this.sharedService.triggerFunctionCall(value).subscribe(
  //       (results) => {
  //         console.log('Results after blur:', results);
  //       },
  //       (error) => {
  //         console.error('Error after blur:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Input is empty, no search triggered');
  //   }
  // }

  redirectToInstagram() {
    window.open('https://www.instagram.com/job_posters_usa/', '_blank');
  }
  // onSearchEnter(e: any) {
  //   console.log('search', e.target.value);
  //   this.sharedService.triggerFunctionCall(e);
  // }
}
