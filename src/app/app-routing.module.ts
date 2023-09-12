import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { CarbonFootprintComponent } from './pages/carbon-footprint/carbon-footprint.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrganizationUsersComponent } from './pages/organization-users/organization-users.component';
import { authGuard } from './auth/auth.guard';
import { CarbonFootprintStepperComponent } from './components/carbon-footprint-stepper/carbon-footprint-stepper.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { RegisterOrganizationComponent } from './pages/register-organization/register-organization.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'register-organization', component: RegisterOrganizationComponent
  },
  {
    path: 'organization', component: OrganizationComponent
  },
  {
    path: 'profile/:username',component: ProfileUserComponent
  },
  {
    path: 'profile',component: ProfileUserComponent
  },
  {
    path: 'activity',component: ProfileComponent
  },
  {
    path: 'forbidden', component: ForbiddenComponent
  },
  {
    path: 'manage', component: OrganizationUsersComponent, canActivate:[authGuard], data:{roles:['ROLE_ORGANIZATION','ROLE_ORGANIZATION_MANAGER']}
  },
  {
    path: 'footprint', component: CarbonFootprintComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
