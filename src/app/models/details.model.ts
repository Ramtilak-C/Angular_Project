import { EmployeeDetails } from "./employee-details.model";
import { Position } from "./position.model";

export interface Details {
    position: Position;
    startsAt: number;
    endsAt: number;
    id?: number,
    employees: Array<EmployeeDetails>
  }