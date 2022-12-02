import { IQuiz } from "../types"

export const enum questionIds {
    first = '1',
    second = '2',
    third = '3',
    // fourth = '4',
    // fifth = '5',
    // sixth = '6',
    // seventh = '7',
    // eighth = '8',
    // ninth = '9',
    // tenth = '10',
}

export const enum systemsIds {
    liteSolo = 'lite-solo',
    liteMast = 'lite-mast',
    protectOptima = 'protect-optima',
    standartUniversal = 'standart-universal',
    drenazhLiteKMS = 'drenazh-lite-kms',
    fasadSiding = 'fasad-siding',
    fasadEconom = 'fasad-econom',
    fasadStandart = 'fasad-standart',
}

export const quiz: IQuiz = {
    [questionIds.first]: {
        title: 'Какой фундамент Вы бы хотели?',
        order: 1,
        variants: [
            {
                systemId: systemsIds.drenazhLiteKMS,
                title: 'Сборный фундамент без подвальных или технических этажей',
            },
            {
                systemId: systemsIds.fasadEconom,
                title: 'Сборный фундамент с эксплуатируемым подвальным или техническим этажом',
            },
            {
                systemId: systemsIds.fasadSiding,
                title: 'Монолитный фундамент без подвальных или технических этажей',
            },
            {
                systemId: systemsIds.fasadStandart,
                title: 'Монолитный фундамент с эксплуатируемым подвальным или техническим этажом',
            },
        ],
        condition: null,
    },
    [questionIds.second]: {
        title: 'Какой цоколь Вы бы хотели?',
        order: 2,
        variants: [
            {
                systemId: systemsIds.drenazhLiteKMS,
                title: 'Из блоков',
            },
            {
                systemId: systemsIds.fasadEconom,
                title: 'Из кирпича',
            },
        ],
        condition: [
            {
                questionId: questionIds.first,
                answer: systemsIds.drenazhLiteKMS,
            },
            {
                questionId: questionIds.first,
                answer: systemsIds.fasadSiding,
            },
        ],
    },
    [questionIds.third]: {
        title: 'Какой фасад Вы бы хотели?',
        order: 3,
        variants: [
            {
                systemId: systemsIds.drenazhLiteKMS,
                title: 'Сайдинг',
            },
            {
                systemId: systemsIds.fasadEconom,
                title: 'Кирпич',
            },
            {
                systemId: systemsIds.fasadEconom,
                title: 'Фасадная плитка',
            },
        ],
        condition: null,
    },
}
