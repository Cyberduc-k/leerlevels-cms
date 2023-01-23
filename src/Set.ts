import { Target } from "./Target";
import { User } from "./User";

export interface Set{
    id:string,
    name:string,
    user: User[]
    target: Target[]

    isNew: Boolean,
}