import { Component } from '@angular/core';

@Component({
  selector: 'meter-app-root',
  template: `
  <div class="container body-container">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
