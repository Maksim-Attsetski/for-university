import { IQuiz } from '../types';

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
  woodenFloor = 'wooden-floor',
  prefabricated = 'prefabricated',
  luskasrdMansarda = 'luskasrd-mansarda',
  shinglasMansarda = 'shinglasMansarda',
  shinglasClassic = 'shinglasClassic',
  krovlyaOptima = 'krovlyaOptima',
  krovlyaGarantPlus = 'krovlyaGarantPlus',
  krovlyaGrin = 'krovlyaGrin',
  krovlyaStandart = 'krovlyaStandart',
  krovlyaBarierTrotuar = 'krovlyaBarierTrotuar',
  manhetonDarkBezh = 'manhetonDarkBezh',
  venecia = 'venecia',
  kirvichniCkol = 'kirvichniCkol',
  classicBezheviy = 'classicBezheviy',
  classicDarkBezheviy = 'classicDarkBezheviy',
  classicMix = 'classicMix',
  drevniyKirpichGraphit = 'drevniyKirpichGraphit',
  stariniy = 'stariniy',
  rifeyski = 'rifeyski',
  bastion = 'bastion',
  kirpichKeramicheskiPustoteliy = 'kirpichKeramicheskiPustoteliy',
  kirpichKeramicheskiPolnoteliy = 'kirpichKeramicheskiPolnoteliy',
  kirpichKeramicheskiOblicovochniy = 'kirpichKeramicheskiOblicovochniy',
  kirpichKlinkerniy = 'kirpichKlinkerniy',
  blokGazosilikat = 'blokGazosilikat',
  no = 'no',
}

// const e = [
//   { Name: 'Мрамор', Price: '449.22' },
//   { Name: 'Дерево', Price: '46,74' },
//   { Name: 'Стекло', Price: '450,00' },
//   { Name: 'Блок газосиликатный 100 x 249 x 625 мм МКСИ', Price: '2,39' },
//   { Name: 'Кирпич силикатный утолщённый рядовой пустотелый', Price: '336,00' },
//   { System: 'ТН-ПОЛ Термо PIR', Price: '399,96' },
//   { System: 'ТН-ПОЛ Акустик КМС', Price: '319,90' },
//   { System: 'ТН-ПОЛ Классик КМС', Price: '574,65' },
//   { Name: 'ТН-НАТЯЖНОЙ ПОТОЛОК', Price: '28,59' },
//   { Name: 'ТН-Краска', Price: '232,09' },
//   { Name: 'ТН-ПОДВЕС', Price: '54,94' },
//   { Name: 'ТН-ПЛИТА', Price: '100,04' },
//   { Name: 'Ванна акриловая Triton Ультра 120x70 (с ножками', Price: '269' },
//   { Name: 'Душевая кабина Armazzi', Price: '726.86' },
//   { Name: 'ТН-ШТУКОТУРКА', Price: '144,47' },
//   { Name: 'ТС71447-43', Price: '68,9' },
//   { Name: 'Силиконовая пропитка', Price: '20,50' },
//   { Name: 'Фасадная акриловая краска', Price: '55,76' },
// ];

export const quiz: IQuiz = {
  [1]: {
    id: 1,
    order: 1,
    title: 'Какой фундамент Вы бы хотели?',
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  [6]: {
    title: 'Вы бы хотели выбрать облицовочный кирпич?',
    order: 6,
    id: 6,
    variants: [
      {
        systemId: systemsIds.no,
        title: 'Нет',
      },
      {
        systemId: systemsIds.manhetonDarkBezh,
        title: 'Да, Манхэтен темный беж',
      },
      {
        systemId: systemsIds.venecia,
        title: 'Да, Венеция',
      },
      {
        systemId: systemsIds.kirvichniCkol,
        title: 'Да, Кирпичный скол',
      },
      {
        systemId: systemsIds.classicBezheviy,
        title: 'Да, Классический бежевый',
      },
      {
        systemId: systemsIds.classicDarkBezheviy,
        title: 'Да, Классический темный беж',
      },
      {
        systemId: systemsIds.classicMix,
        title: 'Да, Классический микс',
      },
      {
        systemId: systemsIds.drevniyKirpichGraphit,
        title: 'Да, Древний кирпич графит',
      },
      {
        systemId: systemsIds.stariniy,
        title: 'Да, Старинный',
      },
      {
        systemId: systemsIds.rifeyski,
        title: 'Да, Рифейский',
      },
    ],
    condition: [
      {
        questionId: 3,
        answer: systemsIds.fasadSiding,
      },
      {
        questionId: 3,
        answer: systemsIds.fasadLiteHauberk,
      },
    ],
  },
  [7]: {
    title: 'Какие перегородки Вы бы хотели?',
    id: 7,
    order: 7,
    variants: [
      {
        systemId: systemsIds.kirpichKeramicheskiPolnoteliy,
        title: 'Перегородки в 1 кирпича',
      },
      {
        systemId: systemsIds.kirpichKeramicheskiPustoteliy,
        title: 'Перегородки в 1/2 кирпича',
      },
      {
        systemId: systemsIds.blokGazosilikat,
        title: 'Перегородки из пенобетонных блоков',
      },
    ],
    condition: [
      {
        questionId: 1,
        answer: systemsIds.liteSolo,
      },
      {
        questionId: 1,
        answer: systemsIds.liteMast,
      },
    ],
  },
  [8]: {
    title: 'Какие перегородки Вы бы хотели?',
    id: 8,
    order: 7,
    variants: [
      {
        systemId: systemsIds.blokGazosilikat,
        title: 'Перегородки из пенобетонных блоков',
      },
    ],
    condition: [
      {
        questionId: 7,
        answer: systemsIds.kirpichKeramicheskiPolnoteliy,
      },
      {
        questionId: 7,
        answer: systemsIds.kirpichKeramicheskiPustoteliy,
      },
      {
        questionId: 7,
        answer: systemsIds.blokGazosilikat,
      },
    ],
  },
  [9]: {
    title: 'Вам нужны своды, арки и другие декоративные конструкции из кирпича?',
    id: 9,
    order: 8,
    variants: [
      {
        systemId: systemsIds.kirpichKeramicheskiPustoteliy,
        title: 'Да',
      },
      {
        systemId: systemsIds.no,
        title: 'Нет',
      },
    ],
    condition: [
      {
        questionId: 1,
        answer: systemsIds.liteSolo,
      },
      {
        questionId: 1,
        answer: systemsIds.liteMast,
      },
    ],
  },
  [10]: {
    title: 'Какие перекрытия Вы бы хотели?',
    id: 10,
    order: 9,
    variants: [
      {
        systemId: systemsIds.woodenFloor,
        title: 'Деревянные перекрытия',
      },
      {
        systemId: systemsIds.monolith,
        title: 'Монолитные железобетонные перекрытия',
      },
      {
        systemId: systemsIds.prefabricated,
        title: 'Сборные перекрытия (железобетонные плиты)',
      },
    ],
    condition: null,
  },
  [11]: {
    title: 'Какой тип кровли вы бы хотели?',
    id: 11,
    order: 10,
    variants: [
      {
        systemId: systemsIds.woodenFloor,
        title: 'Плоские крыши',
      },
      {
        systemId: systemsIds.monolith,
        title: 'Скатные крыши',
      },
    ],
    condition: [
      {
        questionId: 9,
        answer: systemsIds.woodenFloor,
      },
    ],
  },
  [12]: {
    title: 'Какой тип кровли вы бы хотели?',
    id: 12,
    order: 10,
    variants: [
      {
        systemId: systemsIds.monolith,
        title: 'Скатные крыши',
      },
    ],
    condition: [
      {
        answer: systemsIds.woodenFloor,
        questionId: 10,
      },
      {
        answer: systemsIds.monolith,
        questionId: 10,
      },
    ],
  },
  [13]: {
    title: 'Какое покрытие кровли Вы бы хотели?',
    id: 13,
    order: 11,
    variants: [
      {
        systemId: systemsIds.shinglasMansarda, // для скатных
        title: 'Волнистые листы',
      },
      {
        systemId: systemsIds.luskasrdMansarda,
        title: 'Классическая черепица',
      },
      {
        systemId: systemsIds.shinglasClassic,
        title: 'Гибкая черепица',
      },
    ],
    condition: [
      {
        questionId: 10,
        answer: systemsIds.woodenFloor,
      },
    ],
  },
  [14]: {
    title: 'Какое покрытие кровли Вы бы хотели?',
    id: 13,
    order: 11,
    variants: [
      {
        systemId: systemsIds.krovlyaGrin,
        title: 'Грунт с зелёными насаждениями',
      },
      {
        systemId: systemsIds.krovlyaBarierTrotuar,
        title: 'Плитка',
      },
      {
        systemId: systemsIds.krovlyaOptima,
        title: 'Монолит',
      },
      {
        systemId: systemsIds.krovlyaStandart,
        title: 'Кровельный ковёр',
      },
      {
        systemId: systemsIds.monolith,
        title: 'Стальной профилированный настил',
      },
    ],
    condition: [
      {
        questionId: 10,
        answer: systemsIds.monolith,
      },
    ],
  },
};
