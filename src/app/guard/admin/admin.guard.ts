import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService
      .checkAuth()
      .then((id) => {
        console.log(['checking id:', id]);
        if (id) {
          this.profileService
            .getProfile()
            .then((profile) => {
              console.log('user profile: ', profile);
              if (profile) {
                if (profile?.type == 'admin') return true;
                else return false;
              } else {
                this.authService.logout();
                this.router.navigateByUrl('/login');
                return false;
              }
            })
            .catch((e) => {
              console.log(e);
              this.authService.logout();
              this.router.navigateByUrl('/login');
              return false;
            });
          return true;
        } else {
          //redirect to login page
          this.router.navigateByUrl('/login');
        }
      })
      .catch((e) => {
        console.log(e);
        this.router.navigateByUrl('/login');
        return false;
      });
  }
}
