import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component,Inject, EventEmitter, Output } from '@angular/core';
import { CreateChallengeComponent } from '../create-challenge/create-challenge.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChallengeService } from 'src/app/services/challenge.service';
import { AuthService } from 'src/app/services/auth.service';
import { Challenge } from 'src/app/models/challenges.interface';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatChipEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pick-challenge',
  templateUrl: './pick-challenge.component.html',
  styleUrls: ['./pick-challenge.component.css']
})
export class PickChallengeComponent {
  done: Challenge[] = [];
  selectedChallengeIndices: number[] = [];
  loading: boolean = false;
  @Output() challengePicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PickChallengeComponent>,
    public service: ChallengeService,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.fetchAllData();
    this.loading = false;
  }

  async fetchAllData() {
    await this.getAllChallenges();
  }

  async getAllChallenges() {
    try {
      this.done = await this.service.getAllChallenges(this.data.isOrganizationLevel).toPromise() ?? [];
    } catch(error) {
      console.error('An error occured:', error);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  toggleSelection(index: number) {
    const selectedIndex = this.selectedChallengeIndices.indexOf(index);
    if (selectedIndex !== -1) {
      // Deselect
      this.selectedChallengeIndices.splice(selectedIndex, 1);
    } else {
      // Select
      this.selectedChallengeIndices.push(index);
    }
  }

  removeChallenge(event: MatChipEvent, index: number): void {
    this.toggleSelection(index);
  }

  onPick() {
    const selectedChallenges = this.selectedChallengeIndices.map(
      (index) => this.done[index]
    );
    if (selectedChallenges.length > 0) {
      this.saveSelectedChallenges(selectedChallenges);
    } else {
      console.log('No challenges selected.');
    }
    this.dialogRef.close();
  }

  saveSelectedChallenges(selectedChallenges: Challenge[]) {
    const ids: number[] = this.done.map(challenge => challenge.id)
    this.service.join(ids).subscribe(data => {
      console.log("AFTER JOIN",data);
      this.challengePicked.emit();
    });
  }
}
