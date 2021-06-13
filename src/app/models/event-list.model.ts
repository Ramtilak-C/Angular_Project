import { Event } from "./event.model";
import { Pagination } from "./pagination.model";

export interface EventList {
    items: Array<Event>;
    pagination: Pagination
  }