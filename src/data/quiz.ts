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

const sevenDescription = [
  'Схема выкладки в 1 (2) кирпич(a): для начала, самый нижний и верхний ряд установить строго перпендикулярно к стене. Первым надо класть тычковый кирпич, им же закончить кладку, используя только цельные блоки. Между рядами класть армированную сетку.',
  'Этап 1: произвести монтаж гидроизоляции. Этап 2:звукоизоляция. Они крепятся с помощью песчано-цементного раствора. Этап 3: установка первого ряда. Этап 4: дать просохнуть. Этап 5: остальные ряды. Этап 6:  необходимо осуществить привязку перегородки к несущим стенам. Этап 7: армирование: закладывать между блоками каждые 3-4 ряда металлическую арматуру. Этап 8: отделка -завершающий этап.',
];

const nineDescription = [
  'Необходимо закрепить деревянные балки между стенами для следующего этажа.',
  'Делаем стяжку из раствора, который приготавливается из песка и цемента.После выровнять поверхности, она позволит перераспределить нагрузки, испытываемые полом, создает прочное основание.',
];

const tenDescription = [
  'Надо установить опорную раму между опорными стенами и стропильной системой, объединяя их в единую конструкцию.',
  'Это установка опоры для кровли дома с помощью деревянных балок, которые нужно соединить к центру между собой',
  'Пропитать поверхностность материалом, которая  образует полностью несгораемую структуру и препятствует проникновению пламени внутрь.',
  'Надо расстелить пленку под утеплителем с внутренней стороны на стропильную конструкцию. Полотнища рулонного материала укладывать горизонтально и с нахлестом, закрепляя гвоздями.',
];

const elevenDescription = [
  'Сначала необходимо измерить площадь крыши, после начать крепить шиферные листы снизу-вверх по вертикали.Закреплять листы саморезами, и после чего покрасить шиферные листы',
  'Этапы сборки: 1. Для начала закрепляем доски; 2. Устанавливаем гидроизоляцию; 3. Далее поверх гидроизоляции надо набить доски; 4. Закрепляем торцевую пленку; 5 Далее укладываем справа- налево  черепицу',
];

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
    description: [
      'Первый этапом идет разметка положения конструкции. После следует собрать нижний каркас из блоков и скрепить все между собой скобами. Аналогично делаем второй ярус опалубки',
      'Нужно выкопать котлован, после заливаем бетоном. Потом, на расстоянии 20-30 см надо поставить арматурные пруты. Вертикальные пруты нужно приварить между собой, образуя конструкцию столба. Завершающим этапом идет заливка бетоном.',
      'Фундаменты из железобетонных блоков имеют сборную конструкцию. Их создают методом кладки готовых блоков ФБС, между которыми наносится слой цементного раствора.Такие основания являются отличной альтернативой монолитным конструкциям, которые создают путем заливки бетонной смеси в траншеи и опалубку.',
    ],
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
    description: [
      'Делаем разметку.  Кладку блоков надо  начинать с углов, после кладем по всему намеченному периметру, смазывая блоки раствором.',
      'При укладки  между кирпичами укладываются арматурные пруты.',
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
    description: [
      'Перед началом кладки стен с одновременной облицовкой их крупноразмерными плитами подготавливают горизонтальную поверхность основания. На эту поверхность раскладывают слой раствора. На углах стен помещают маячные облицовочные плиты и натягивают шнур-причалку, по которой устанавливают на высоту одного ряда все промежуточные плиты, и проверяют правильность их установки отвесом и уровнем, после чего выполняют кирпичную кладку стены на высоту установленного ряда плит. Далее процесс повторяют.  При облицовке плитами из природного камня (104, а) плиты ряда соединяют между собой пиронами 2, скобами или пластинчатыми крюками, заделываемыми в торцовые пазы плит. Плиты из природного камня закрепляют металлическими анкерами 1, а бетонные плиты крепят к кладке за петли проволочными анкерами.',
    ],
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
    description: [
      'Нужно установить опалубку из досок. После нужно собрать армирующий каркас из прутьев. После происходит заливка лестницы бетоном.',
      'Надо  выбрать высоту, после идет  установка точных размеров. Нужно сделать каркас лестницы с помощью досок и все залить бетоном.',
      'Выбираем высоту, после идет  установка точных размеров. Нужно сделать каркас лестницы с помощью досок и  данную конструкцию залить бетоном.',
    ],
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
    description: [
      'Нужно провести действие по теплозащите стен с применением утеплителя из  материалов, которые укладывают между венцами. Необходимо утеплить швы, после чего в сооружение больше не может поступать влажный и холодный воздух. После, нужна специальная пропитка для дерева, включающая в состав антисептик от гнили, грибка, насекомых и антипирены от распространения огня.',
      'Необходимо провести действие по теплозащите стен с применением утеплителя из  материалов, которые укладывают между венцами. После, нужна специальная пропитка для дерева, включающая в состав антисептик от гнили, грибка, насекомых и антипирены от распространения огня.',
      'Строительство сооружения из кирпичей, которые скрепляются специальным раствором. Между каждым слоем кирпича, надо прокладывать слой арматуры.',
      'Возведение стен с помощью блоков, которые необходимо скреплять между собой раствором',
    ],
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
    description: [
      'Строительство сооружения из облицовочных кирпичей, которые скрепляются специальным раствором. Между каждым слоем кирпича, необходимо прокладывать слой арматуры.',
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
    description: sevenDescription,
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
    description: sevenDescription,
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
    description: [
      'Необходимо использовать  кирпич клиновидной формы, и укладывать его строго по направлению к центру.',
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
    description: nineDescription,
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
    description: tenDescription,
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
    description: tenDescription,
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
    description: elevenDescription,
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
    description: elevenDescription,
  },
};
