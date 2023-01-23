import { Mcq } from "./Mcq";

export interface Target
{
    id: string,
    label: string,
    description: string,
    targetExplanation: string,
    youtubeId: string,
    imageUrl: string,
    mcqs: Mcq[],

    isNew: boolean,
}