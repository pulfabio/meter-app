import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "./auth.service";

@Component({
  selector: 'home',
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.router.navigate(["/login"]);
  }

  logout(): void {
    this.authService.logout();
  }
}