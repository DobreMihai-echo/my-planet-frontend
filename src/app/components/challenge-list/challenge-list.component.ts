import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent {
  hover = false;
  starHover = false;

  challenges = [
    { id: 1, title: 'Challenge 1', description: 'Description 1', completed: false, level:'Easy',points:20, participants:30 },
    { id: 2, title: 'Challenge 2', description: 'Description 2', completed: false, level: 'Medium', points:70, progress:40 },
    { id: 3, title: 'Challenge 3', description: 'Description 3', completed: false, level:'Hard',points:90, progress:50 },
    { id: 4, title: 'Challenge 4', description: 'Description 4', completed: false, level:'Hard',points:90, progress:50 }
  ];
  
  completeChallenge(id: number) {
    const challenge = this.challenges.find(ch => ch.id === id);
    if (challenge) {
      challenge.completed = true;
    }
  }
  
  cancelChallenge(id: number) {
    const challenge = this.challenges.find(ch => ch.id === id);
    if (challenge) {
      challenge.completed = false;
    }
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
