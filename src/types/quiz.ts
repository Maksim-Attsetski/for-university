
interface IVariant {
    id: string;
    text: string;
    questionId: number;
}

interface IQuestion {
    id: number;
    title: string;
    variants: IVariant[]
}




export type {
    IQuestion, IVariant
}