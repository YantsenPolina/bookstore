import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        (result) => {
          this.userFullName = result.name;
          const email = result.email;
          this.storage.setItem('userEmail', JSON.stringify(email));
        }
      );
    }
  }

  logout() {
    this.oktaAuthService.signOut();
  }
}
