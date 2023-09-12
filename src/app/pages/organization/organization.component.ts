import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateChallengeComponent } from 'src/app/components/create-challenge/create-challenge.component';
import { PickChallengeComponent } from 'src/app/components/pick-challenge/pick-challenge.component';
import { Challenge } from 'src/app/models/challenges.interface';
import { Leaderboard, Organization } from 'src/app/models/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organisations:Organization[] = [];
  isOrganizationLevel = true;
  challenges:Challenge[] = [];
  leaderboardDataToday:Leaderboard[] = [];
  leaderboardDataMonth:Leaderboard[] = [];
  leaderboardDataYear:Leaderboard[] = [];
  constructor(private challengeService:ChallengeService, private userService:UserService,public authService: AuthService, private matDialog:MatDialog){}
  ngOnInit(): void {
    this.userService.getOrganizations().subscribe(data => {
      this.organisations = data;
    })  

    this.getChallengesForUser();

    this.userService.getOrganizationLeaderboard().subscribe(data => {
      this.leaderboardDataToday = [...data].sort((a, b) => b.points - a.points);
      this.leaderboardDataMonth = [...data].sort((a, b) => b.pointsMonth - a.pointsMonth);
      this.leaderboardDataYear = [...data].sort((a, b) => b.pointsYear - a.pointsYear);
    })
  }

  selectedRegion: string;

  updateChart(region: string) {
    this.selectedRegion = region;
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(PickChallengeComponent, {
      data: {isOrganizationLevel: true},
      width:'1000px',
      height:'1000px'
    });

    dialogRef.componentInstance.challengePicked.subscribe(()=>{
      this.getChallengesForUser();
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(CreateChallengeComponent, {
      data: { isOrganizationLevel: true }
    });
    dialogRef.afterClosed().subscribe(rs => {
      console.log("HELLOOOO GOTHAM");
    })
  }

  joinOrganization(organization: any) {
    console.log('Joining', organization);
    this.userService.joinOrganization(organization.name).subscribe(data=>{
      console.log("ROLES:", data);
      this.authService.setRoles(data);
    })
  }

  getChallengesForUser() {
    this.challengeService.getAllOngoingChallenges(this.isOrganizationLevel).subscribe(data=>{
      this.challenges = data
    })
  }
}
