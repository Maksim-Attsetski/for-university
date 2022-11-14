
interface IVariant {
    id: number;
    text: string;
}

interface IQuestion {
    id: number;
    title: string;
    variants: IVariant[]
}

interface IAnswer {
    id: number;
    title: string;
}



interface IQuiz {
    quiestions: IQuestion[];
    answers: IAnswer[];

}

export type {
    IQuiz, IQuestion, IVariant, IAnswer
}