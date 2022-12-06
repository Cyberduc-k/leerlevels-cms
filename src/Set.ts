import { Target } from "./Target";
import { User } from "./User";

export interface Set{
    Id:string,
    Name:string,
    User: User[]
    Target: Target[]
}