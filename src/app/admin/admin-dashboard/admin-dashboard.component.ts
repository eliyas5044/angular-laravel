import {Component, OnInit} from '@angular/core';
import {User} from '../../login/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  item = JSON.parse(localStorage.getItem('tokens'));
  user: User;

  constructor() {
  }

  ngOnInit() {
    if (this.item != null) {
      if (this.item.token) {
        this.user = this.item.user;
      }
    }
  }

}
