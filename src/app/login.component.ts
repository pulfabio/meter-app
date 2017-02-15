import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMsg: string = "";
  email: string = "";
  password: string = "";
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe((result) => {
      if (result.success) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/elettr';
        // Redirect the user
        this.router.navigate([redirect]);
      } else {
        this.errorMsg = result.message;
      }
    });
  }
}