import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { EventList } from '../models/event-list.model';
import { Event } from '../models/event.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = Constants.eventListColumns;
  dataSource : MatTableDataSource<Event>;
  pageSize = Constants.defaultPageSize;
  eventList: Array<Event>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private commonService: CommonService){}

  ngOnInit(): void {
    this.fetchEventList();
  }

  fetchEventList(): void {
    this.commonService.getHttpResponse(
      Constants.eventListUrl,
      null,
      'GET'
    )
    .subscribe((response: EventList) => {
      if(response) {
        this.eventList = response.items;
        this.dataSource = new MatTableDataSource<Event>(this.eventList);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  loadMore() : void {
    if(this.eventList.length > this.pageSize) {
      this.pageSize += Constants.defaultPageSize;
      this.paginator.pageSize += Constants.defaultPageSize;
      this.dataSource = new MatTableDataSource<Event>(this.eventList);
    }
  }

  performAction(row: Event): void {
    this.commonService.selectedId = row.id;
    this.router.navigate([Constants.employeeDetails]);
  }

  setupFilter(column: string): void {
    this.dataSource.filterPredicate = (d: Event, filter: string) => {
      const formattedValue = formatDate(d[column], 'dd-MM-yyyy HH:mm:ss', 'en-US')
      const textToSearch = formattedValue && formattedValue.toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }
  
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}





