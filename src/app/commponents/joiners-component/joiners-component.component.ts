import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-joiners-component',
  templateUrl: './joiners-component.component.html',
  styleUrls: ['./joiners-component.component.css']
})
export class JoinersComponentComponent {
  safeSvgUrl: SafeResourceUrl;
  constructor(private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    this.safeSvgUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/profile.jpg');
  }
}
