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

  availableRoles = ['Manager', 'User'];

  constructor(private service: OrganizationService, private userService: UserService, public authService:AuthService,
     private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.getUserOrganizationName();
  }

  getUserOrganizationName() {
    return this.service.getJoiners(this.authService.getUsername()).subscribe(res => {
      this.joinerList = res.map(user => {
        const roleObj = user.roles.find(role => role.name === 'ORGANIZATION_USER' || role.name === 'ORGANIZATION_MANAGER');
        const mappedRole = this.mapRoleToDropdownValue(roleObj ? roleObj.name : 'Unknown');
        return {
          ...user,
          role: mappedRole
        }
      });
      this.dataSource = new MatTableDataSource<Joiners>(this.joinerList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  mapRoleToDropdownValue(role: string): string {
    console.log("ROLE:",role);
    const roleMap = {
        'ORGANIZATION_MANAGER': 'Manager',
        'ORGANIZATION_USER': 'User',
    };
    return roleMap[role] || 'Unknown';
}

onRoleChange(element: any, event: any) {
  const newRole = event.value;
  element.role = newRole;
  const username = element.username;

  this.userService.updateUserRole(username, newRole).subscribe(
    response => {
      // Handle successful API call
      console.log("Role updated successfully:", response);
    },
    error => {
      // Handle error during API call
      console.log("Error updating role:", error);
    }
  );
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
