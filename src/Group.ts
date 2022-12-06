import { Set } from "./Set";
import { User } from "./User";

export interface Group {
    Id:string,
    Name: string,
    Subject: string,
    EducationType: number,
    SchoolYear: number,
    User: User[]
    Set: Set[] 
}

export enum EducationType{
    Havo,
    Mavo,
    Mbo,
    Hbo,
    Basisschool,
    Bijles,
    Vmbo,
    Vwo,
    Universiteit,
    Overig,
}

export enum SchoolYear{
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine
}