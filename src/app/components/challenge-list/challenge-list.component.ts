import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/app/models/challenges.interface';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit{
  @Input() isOrganizationLevel:boolean;
  @Input() challenges: Challenge[] = [];
  hover = false;
  starHover = false;

  constructor(private challengeService:ChallengeService){}

  // challenges:Challenge[] = [];
  
  ngOnInit(): void {
    
  }

  completeChallenge(id: number) {
    console.log("CLICKED ON:",id);
    this.challengeService.completeChallenge(id).subscribe(data => {
      this.challenges = this.challenges.filter(challenge => challenge.id !== id);
    })
  }
  
  cancelChallenge(id: number) {
    // const challenge = this.challenges.find(ch => ch.id === id);
    // if (challenge) {
    //   challenge.completed = false;
    // }
  }

  reviewChallenge(id: number) {
    // logic to open the review dialog
  }

  getLevelColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'easy':
        return '#4CAF50'; // green
      case 'medium':
        return '#FFC107'; // amber
      case 'hard':
        return '#F44336'; // red
      default:
        return '#9E9E9E'; // grey for unknown levels
    }
  }
  
}
