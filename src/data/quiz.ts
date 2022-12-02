import { IQuiz } from "../types"

export const enum questionIds {
    first = 'r30904jo29nhr0fnh',
    second = 'mrlgo2309r2oinhu',
    third = 'nofw394u0u923j',
    // fourth = 'pogknrtpojweom',
    // fifth = '293ur2jofiehwidcnk',
    // sixth = 'ncoiwe498324iohr2iud',
    // seventh = '34nt9efjoin',
    // eighth = 'ascpl209gu0w9r',
    // ninth = 'v9eu283hiurbh6j50',
    // tenth = '23948urjdfh65bgiut',
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
                title: 'Сборный фундамент без подвальных или технических этажей?',
            },
            {
                systemId: systemsIds.fasadEconom,
                title: 'Сборный фундамент с эксплуатируемым подвальным или техническим этажом?',
            },
            {
                systemId: systemsIds.fasadSiding,
                title: 'Монолитный фундамент без подвальных или технических этажей?',
            },
            {
                systemId: systemsIds.fasadStandart,
                title: 'Монолитный фундамент с эксплуатируемым подвальным или техническим этажом?',
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
