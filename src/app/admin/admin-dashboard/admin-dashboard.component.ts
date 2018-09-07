import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.userObject.subscribe(res => this.user = res);
  }

}
