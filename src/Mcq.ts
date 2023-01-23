import { AnswerOption } from "./AnswerOption"

export interface Mcq
{
    id: string
    questionText: string
    explanation: string
    allowRandom: boolean
    answerOptions: AnswerOption[]

    isNew: boolean,
}