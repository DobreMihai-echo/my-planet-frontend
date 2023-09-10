import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationComponent } from './pages/organization/organization.component';
import { CarbonFootprintComponent } from './pages/carbon-footprint/carbon-footprint.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EventsComponent } from './components/events/events.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ReplyComponent } from './components/reply/reply.component'
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartComponent } from './components/charts/chart/chart.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrganizationUsersComponent } from './pages/organization-users/organization-users.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CarbonFootprintStepperComponent } from './components/carbon-footprint-stepper/carbon-footprint-stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CarbotFootprintOffsetComponent } from './components/carbot-footprint-offset/carbot-footprint-offset.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { CreateChallengeComponent } from './components/create-challenge/create-challenge.component';
import { TagsComponent } from './components/tags/tags.component';
import { PickChallengeComponent } from './components/pick-challenge/pick-challenge.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';



// Export this function
export function playerFactory() {
  return player;
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    OrganizationComponent,
    CarbonFootprintComponent,
    ProfileComponent,
    NavbarComponent,
    EventsComponent,
    DialogComponent,
    SnackbarComponent,
    ReplyComponent,
    ChartComponent,
    MiniMapComponent,
    OrganizationUsersComponent,
    CarbonFootprintStepperComponent,
    CarbotFootprintOffsetComponent,
    ProfileUserComponent,
    EditDialogComponent,
    SearchComponent,
    ConfirmationDialogComponent,
    LeaderboardComponent,
    ChallengeListComponent,
    ChallengeCardComponent,
    CreateChallengeComponent,
    TagsComponent,
    PickChallengeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    GoogleMapsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CarouselModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    MatSnackBarModule,
    MatMenuModule,
    LayoutModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HighchartsChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LottieModule.forRoot({ player: playerFactory }), 
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatProgressBarModule,
    MatChipsModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},UserService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
