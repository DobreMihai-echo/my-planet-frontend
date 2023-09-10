import { Component } from '@angular/core';
import { LeaderBoard, Member } from './laderboards.interface';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  activeTab = 'month';
  leaderboardData = [
    { name: 'Charles John', points: 195 },
    { name: 'Alex Mike', points: 185 },
    // ... more data
  ];
}
