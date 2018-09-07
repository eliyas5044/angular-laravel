import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { deleteCookie } from '../cookie';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  private token: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.token.subscribe(res => this.token = res);
    this.authService.isUserLoggedIn.subscribe(res => this.isLoggedIn = res);
  }

  logout() {
    this.authService.logout(this.token).subscribe(res => {
      deleteCookie('token');
      deleteCookie('user');
      this.authService.token.next(null);
      this.authService.userObject.next(new User());
      this.authService.isUserLoggedIn.next(false);
      this.router.navigateByUrl('login');
    });
  }
}
