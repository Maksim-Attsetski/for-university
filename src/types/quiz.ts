import { systemsIds } from '../data';

type questionId = number;

interface ICondition {
  questionId: questionId;
  answer: systemsIds;
}

interface IVariants {
  systemId: systemsIds;
  title: string;
}

interface IAnswer {
  questionId: questionId;
  title: string | null;
  order: number | null;
  answer: IVariants | null;
}

interface IQuestion {
  id: number;
  title: string;
  order: questionId;
  variants: IVariants[];
  condition: ICondition[] | null;
  description: string[];
}

type typeOfAnswer = {
  [key: IAnswer['questionId']]: IAnswer;
};

type typeOfQuestion = {
  [key: IQuestion['id']]: IQuestion;
};

interface IQuiz {
  [1]: IQuestion;
  [2]: IQuestion;
  [3]: IQuestion;
  [4]: IQuestion;
  [5]: IQuestion;
  [6]: IQuestion;
  [7]: IQuestion;
  [8]: IQuestion;
  [9]: IQuestion;
  [10]: IQuestion;
  [11]: IQuestion;
  [12]: IQuestion;
  [13]: IQuestion;
  [14]: IQuestion;
}

export type { IQuiz, typeOfQuestion, typeOfAnswer, IQuestion, IVariants, ICondition, IAnswer };
