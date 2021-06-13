import { Position } from "./position.model";

export interface Event {
    position: Position;
    startsAt: number;
    endsAt: number;
    id?: number
  }