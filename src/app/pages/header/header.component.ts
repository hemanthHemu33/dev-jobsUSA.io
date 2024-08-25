import { Component } from '@angular/core';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private sharedService: ServerService) {}

  redirectToInstagram() {
    window.open('https://www.instagram.com/job_posters_usa/', '_blank');
  }
  onSearchEnter(e: any) {
    console.log('search', e.target.value);
    this.sharedService.triggerFunctionCall(e);
  }
}
