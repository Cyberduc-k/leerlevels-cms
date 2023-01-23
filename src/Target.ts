import { Mcq } from "./Mcq";
import { Set } from "./Set";

export interface Target{
    Id: string,
    Label:string,  
    Description: string, 
    TargetExplanation: string, 
    YoutubeId: string,  
    ImageUrl: string,  
    Mcq: Mcq[]
    Set: Set[]
}