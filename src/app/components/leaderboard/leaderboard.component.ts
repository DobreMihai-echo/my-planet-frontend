import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LeaderBoard, Member } from './laderboards.interface';
import { User } from 'src/app/pages/profile/user.interface';
import { Leaderboard } from 'src/app/models/users.interface';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input() leaderboardDataToday: Leaderboard[] = [];
  @Input() leaderboardDataMonth: Leaderboard[] = [];
  @Input() leaderboardDataYear: Leaderboard[] = [];

  activeTab = 'month';
  currentLeaderboardData: any = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.setActiveTab(this.activeTab);
  }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['leaderboardDataToday'] || changes['leaderboardDataMonth'] || changes['leaderboardDataYear']) {
      this.setActiveTab(this.activeTab); // Update the data when any input changes
    }
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.currentLeaderboardData = this[`leaderboardData${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)}`];
    console.log("CURRENT LEADERBOAARD:",this.leaderboardDataToday);
  }
  
}
