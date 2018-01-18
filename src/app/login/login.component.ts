import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from './user';
import {HttpErrorResponse} from '@angular/common/http';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  dataInvalid = false;
  formErrors = [];
  formSubmitting = false;

  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {

  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn) {
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'admin';
      // Redirect the user
      this.router.navigate([redirect]);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.formErrors = [];
    this.formSubmitting = true;
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.formSubmitting = false;
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'admin';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    }, (err: HttpErrorResponse) => {
      this.dataInvalid = true;
      this.formSubmitting = false;
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        this.formErrors.push(err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (err.status === 0) {
          this.formErrors.push('please check your backend server.');
        } else {
          const errors = err.error;
          const items = [];
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              items.push(errors[key]);
            }
          }
          for (const k in items[1]) {
            if (items[1].hasOwnProperty(k)) {
              this.formErrors.push(items[1][k][0]);
            }
          }
        }
      }
    });
  }
}
