import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDetailsComponent } from "./event-list/employee-details/employee-details.component";
import { EventListComponent } from "./event-list/event-list.component";

const routes: Routes = [
    {
        path: 'event-list',
        component: EventListComponent,
    },
    {
        path: 'employee-details',
        component: EmployeeDetailsComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {}