import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TagsComponent } from '../tags/tags.component';
import { ChallengeService } from 'src/app/services/challenge.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateChallengeComponent>, private matDialog: MatDialog, private challengeService: ChallengeService) { }

  pointsArray = Array.from({ length: 10 }, (_, i) => 10 * (i + 1));

  title: string;
  postTags: any[] = [];
  points: number;
  mycolor: string = "#fff";
  description: string;
  createChallengeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required]],
    points: ['', [Validators.required]]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const { title, description, points } = this.createChallengeForm.value;
    const obj = {
      title: title,
      description: description,
      points: points,
      challengeTags: this.postTags
    }

    if (title !== null && title !== undefined && description !== null && description !== undefined && points !== null && points !== undefined) {
      console.log("INSIDE IF:");
      this.challengeService.postChallenge(this.data.isOrganizationLevel,obj).subscribe(data => {
        this.dialogRef.close();
      })
    };
  }

  openAddTagDialog(e: Event): void {
    e.preventDefault();

    const dialogRef = this.matDialog.open(TagsComponent, {
      width: '500px',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const tagIndex = this.postTags.findIndex(tN => tN === result.tagName);
          if (tagIndex >= 0) {
            this.postTags[tagIndex].action = 'add'
          } else {
            this.postTags.push({
              tagName: result.tagName,
              action: 'add'
            })
          }
        }
        console.log(this.postTags)
      }
    );
  }
}
