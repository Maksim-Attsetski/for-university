import { IWork } from '../types/work';

export const works: IWork[] = [
  {
    name: 'Выноска осей',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 1,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Планировка',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 2,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Разработка и выемка грунта',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 3,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство песчанных оснований с трамбованием',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 4,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство щебеночных оснований с трамбованием',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 5,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Усторйство траншей',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 6,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Обратная засыпка грунтом',
    type: 'excavation',
    unitOfMeasure: 'm3',
    order: 12,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство опалубки',
    type: 'foundation',
    unitOfMeasure: 'm2',
    order: 7,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство ленточного фундамента и стен подвалов с приготовлением раствора (амирование, приготовление раствора,бетонирование)',
    type: 'foundation',
    unitOfMeasure: 'm3',
    order: 8,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: [
      {
        name: 'Устройство ленточного фундамента из бетонных блоков',
        type: 'foundation',
        unitOfMeasure: 'm3',
        order: 8,
        price: 10,
        time: 5,
        materials: [],
        worksToChoose: null,
        activeWork: null,
      },
    ],
    activeWork: null,
  },
  {
    name: 'Руллоная гидроизоляция ( вертикальная и горизонтальная)',
    type: 'foundation',
    unitOfMeasure: 'm2',
    order: 9,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Кладка цоколя',
    type: 'foundation',
    unitOfMeasure: 'm3',
    order: 10,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Армирование цоколя',
    type: 'foundation',
    unitOfMeasure: 'm2',
    order: 11,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство железобетонной монолитной плиты пола',
    type: 'foundation',
    unitOfMeasure: 'm3',
    order: 13,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Устройство монолитной площадки бетонной лестницы (опалубка, армирование, бетонирование)',
    type: 'foundation',
    unitOfMeasure: 'm2',
    order: 14,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: null,
    activeWork: null,
  },
  {
    name: 'Установка готовых лестничных ступеней',
    type: 'foundation',
    unitOfMeasure: 'thing',
    order: 15,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: [
      {
        name: 'Устройство монолитных железобетонных ступеней (опалубка, армирование, бетонирование)',
        type: 'foundation',
        unitOfMeasure: 'thing',
        order: 15,
        price: 10,
        time: 5,
        materials: [],
        worksToChoose: null,
        activeWork: null,
      },
    ],
    activeWork: null,
  },
  {
    name: 'Возведение стен из бревна (конопатка стен, утепление, антисептирование деревянных стен огне-био защита)',
    type: 'walls',
    unitOfMeasure: 'm2',
    order: 16,
    price: 10,
    time: 5,
    materials: [],
    worksToChoose: [
      {
        name: 'Возведение стен из бруса (конопатка стен, утепление, антисептирование деревянных стен огне-био защита)',
        type: 'walls',
        unitOfMeasure: 'm2',
        order: 16,
        price: 10,
        time: 5,
        materials: [],
        worksToChoose: null,
        activeWork: null,
      },
      {
        name: 'Возведение стен из кирпича (амирование)',
        type: 'walls',
        unitOfMeasure: 'm3',
        order: 16,
        price: 10,
        time: 5,
        materials: [],
        worksToChoose: null,
        activeWork: null,
      },
      {
        name: 'Возведение стен из блоков',
        type: 'walls',
        unitOfMeasure: 'm3',
        order: 16,
        price: 10,
        time: 5,
        materials: [],
        worksToChoose: null,
        activeWork: null,
      },
    ],
    activeWork: null,
  },
];
