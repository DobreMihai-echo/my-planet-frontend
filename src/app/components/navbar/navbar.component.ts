import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/pages/profile/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  loggedInUser: User;

  constructor(public authService: AuthService, private userService: UserService){}
  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    //this.updateUserInformation();
  }

  updateUserInformation() {
    if(this.authService.isLoggedIn() && this.loggedInUser===undefined) {
      this.getUserInformation();
    }
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      this.authService.clear();
    }

    isLoggedIn() {
      return this.authService.isLoggedIn();
    }

    getUserInformation() {
      return this.userService.getUserByUsername(this.authService.getUsername()).subscribe(data => {
        this.loggedInUser = data;
      })
    }


}
