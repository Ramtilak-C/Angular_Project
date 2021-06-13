import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Location} from '@angular/common';
import { Constants } from 'src/app/constants/constants';
import { CommonService } from 'src/app/services/common.service';
import { Details } from 'src/app/models/details.model';
import { EmployeeDetails } from 'src/app/models/employee-details.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = Constants.employeeColumns;
  dataSource : MatTableDataSource<EmployeeDetails>;
  employeeDetails: Array<EmployeeDetails>;
  fullResponse: Details;

  constructor(private commonService: CommonService, private _location: Location){}

  ngOnInit(): void {
    this.fetchEmployeeDetails();
  }

  fetchEmployeeDetails(): void {
    this.commonService.getHttpResponse(
      `${Constants.eventListUrl}/${this.commonService.selectedId}`,
      null,
      'GET'
    )
    .subscribe((response: Details) => {
      if(response) {
        this.fullResponse = response;
        this.employeeDetails = response.employees;
        this.dataSource = new MatTableDataSource<EmployeeDetails>(this.employeeDetails);
      }
    })
  }

  backPage(): void {
    this._location.back();
  }

}
