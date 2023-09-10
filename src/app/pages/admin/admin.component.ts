import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private httpClient: HttpClient){}
  
  ngOnInit(): void {
    console.log('INIT')
    const data = this.httpClient.get(`http://localhost:8080/api/users`).subscribe();
    console.log(data)
  }

}
