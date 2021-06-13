import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class Constants {
    static endPointsUrl = 'https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod';
    static eventListUrl = `${Constants.endPointsUrl}/events`;
    static eventListColumns = ['position', 'startsAt', 'endsAt', 'actions'];
    static employeeDetails = 'employee-details';
    static defaultPageSize = 10;
    static employeeColumns = ['firstName', 'lastName', 'image'];
}