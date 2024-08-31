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

  redirectToInstagram() {
    window.open('https://www.instagram.com/jobpostersusa/', '_blank');
  }
}
