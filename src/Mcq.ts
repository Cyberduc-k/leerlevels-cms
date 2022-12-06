import { AnswerOption } from "./AnswerOption"
import { Target } from "./Target"

export interface Mcq{
    Id: string  
    Target: Target 
    QuestionText: string  
    Explanation: string  
    AllowRandom: boolean  
    AnswerOptions: AnswerOption[]
}