import { questionIds, systemsIds } from "../data";

interface ICondition {
    questionId: questionIds,
    answer: systemsIds; 
}

interface IVariants {
    systemId: systemsIds,
    title: string,
}

interface IAnswer {
    questionId: questionIds | string | number,
    title: string | null,
    order: number | null,
    answer: IVariants | null,
}

interface IQuestion {
    title: string;
    order: number;
    variants: IVariants[];
    condition: ICondition[] | null;
}

interface IQuiz {
    [questionIds.first]: IQuestion;
    [questionIds.second]: IQuestion;
    [questionIds.third]: IQuestion;
    // [questionIds.fourth]: IQuestion;
    // [questionIds.fifth]: IQuestion;
    // [questionIds.sixth]: IQuestion;
    // [questionIds.seventh]: IQuestion;
    // [questionIds.eighth]: IQuestion;
    // [questionIds.ninth]: IQuestion;
    // [questionIds.tenth]: IQuestion;
}

export type { IQuiz, IQuestion, IVariants, ICondition, IAnswer }