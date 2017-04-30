import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginInvalid: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }
  private minLength: number = 6;
  public minLengthError: boolean = false;
  ngOnInit() {
  
  }

  login(formValues) {
    let password: string = formValues.password;
    
    if (password.length < this.minLength){
      this.minLengthError = true;
      this.loginInvalid = false;
      return;
    }

    this.minLengthError = false;
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
} 
