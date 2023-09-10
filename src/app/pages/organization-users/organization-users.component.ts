import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Joiners } from 'src/app/models/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organization-users',
  templateUrl: './organization-users.component.html',
  styleUrls: ['./organization-users.component.css']
})
export class OrganizationUsersComponent implements OnInit{

  joinerList !: Joiners[];
  dataSource: any;
  displayedColumns: string[] = ["profile", "phone", "dateJoined","country","role", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: OrganizationService, private userService: UserService, private authService:AuthService,
     private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.getUserOrganizationName();
  }

  getUserOrganizationName() {
    return this.userService.getOrganization(this.authService.getUsername()).subscribe((data =>{
      this.loadcustomer(data.organizationName)
    })) 
  }

  loadcustomer(organizationName:string) {
    this.service.getJoiners(organizationName).subscribe(res => {
      this.joinerList = res;
      this.dataSource = new MatTableDataSource<Joiners>(this.joinerList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editcustomer(code: any) {
    //this.Openpopup(code, 'Edit Customer',PopupComponent);
  }

  detailcustomer(code: any) {
    //this.Openpopup(code, 'Customer Detail',UserdetailComponent);
  }

  

  addcustomer(){
    //this.Openpopup(0, 'Add Customer',PopupComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      //this.loadcustomer();
    })
  }

}
