import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginInvalid: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signup(formValues) {
    this.authService.signup(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
