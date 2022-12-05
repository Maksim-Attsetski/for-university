import { IQuiz } from '../types';

export type questionIds = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const enum systemsIds {
  liteSolo = 'lite-solo',
  liteMast = 'lite-mast',
  protectOptima = 'protect-optima',
  standartUniversal = 'standart-universal',
  drenazhLiteKMS = 'drenazh-lite-kms',
  fasadSiding = 'fasad-siding',
  fasadEconom = 'fasad-econom', // <--- not used
  fasadStandart = 'fasad-standart',
  fasadLiteHauberk = 'fasad-lite-hauberk',
  reinforcedConcrete = 'reinforced-concrete',
  monolith = 'monolith',
  wallTermoPir = 'wall-termo-pir',
  wallExpress = 'wall-express',
  wallBeam = 'wall-beam',
  wallLog = 'wall-log',
}

export const quiz: IQuiz = {
  [1]: {
    title: 'Какой фундамент Вы бы хотели?',
    order: 1,
    variants: [
      {
        systemId: systemsIds.liteSolo,
        title: 'Сборный фундамент без подвальных или технических этажей',
      },
      {
        systemId: systemsIds.liteMast,
        title: 'Сборный фундамент с эксплуатируемым подвальным или техническим этажом',
      },
      {
        systemId: systemsIds.standartUniversal,
        title: 'Монолитный фундамент без подвальных или технических этажей',
      },
      {
        systemId: systemsIds.drenazhLiteKMS,
        title: 'Монолитный фундамент с эксплуатируемым подвальным или техническим этажом',
      },
    ],
    condition: null,
  },
  [2]: {
    title: 'Какой цоколь Вы бы хотели?',
    order: 2,
    variants: [
      {
        systemId: systemsIds.standartUniversal,
        title: 'Из блоков',
      },
      {
        systemId: systemsIds.liteMast,
        title: 'Из кирпича',
      },
    ],
    condition: [
      {
        questionId: 1,
        answer: systemsIds.liteSolo,
      },
      {
        questionId: 1,
        answer: systemsIds.standartUniversal,
      },
    ],
  },
  [3]: {
    title: 'Какой фасад Вы бы хотели?',
    order: 3,
    variants: [
      {
        systemId: systemsIds.fasadSiding,
        title: 'Сайдинг',
      },
      {
        systemId: systemsIds.fasadStandart,
        title: 'Кирпич',
      },
      {
        systemId: systemsIds.fasadLiteHauberk,
        title: 'Фасадная плитка',
      },
    ],
    condition: null,
  },
  [4]: {
    title: 'Какой лестничный марш Вы бы хотели?',
    order: 4,
    variants: [
      {
        systemId: systemsIds.reinforcedConcrete,
        title: 'Готовый железобетонный',
      },
      {
        systemId: systemsIds.monolith,
        title: 'Монолитный',
      },
    ],
    condition: null,
  },
  [5]: {
    title: 'Какие внутренние стены Вы предпочитаете?',
    order: 5,
    variants: [
      {
        systemId: systemsIds.wallTermoPir,
        title: 'Из кирпича с дополнительным утеплением и звукоизоляцией',
      },
      {
        systemId: systemsIds.wallExpress,
        title: 'Из блоков с внутренней звукоизоляцией',
      },
      {
        systemId: systemsIds.wallBeam,
        title: 'Из бруса с теплоизоляцией',
      },
      {
        systemId: systemsIds.wallLog,
        title: 'Из бревна с теплоизоляцией',
      },
    ],
    condition: null,
  },
};
