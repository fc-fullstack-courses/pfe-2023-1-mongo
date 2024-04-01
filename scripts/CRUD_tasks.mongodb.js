/*
  Insert:
    - вставити в табличку котів 1 запис кота
      має містити поля:
        - ім'я
        - порода
        - вік
        - стать
        - масса
    - вставити в табличку котів 4 - 5 записів
      записи мають містити деякі з полів:
        - ім'я
        - порода
        - вік
        - стать
        - масса

  Read:
    Знайти всіх котиків, які:
      - мають породу - 'British'
      - віком більше ніж 7 років та чоловічої статі
      - масою меншою або рівною 6 або без даних про породу

  Update:
    - всім котам породи 'Maine Coon' встановити масу 8 кг
    - всім котам без статі встановити стать кішки

  Delete
    видалити кота з ім'ям 'Vas`ka'
    видалити всіх котів, з масою менше 0
    видалити всіх котів у яких немає даних про масу або про вік
*/

/*
  Insert:
    - вставити в табличку котів 1 запис кота
      має містити поля:
        - ім'я
        - порода
        - вік
        - стать
        - масса
    - вставити в табличку котів 4 - 5 записів
      записи мають містити деякі з полів:
        - ім'я
        - порода
        - вік
        - стать
        - масса
*/
db.cats.insertOne({
  name: 'Нявчик',
  breed: 'British',
  age: 5,
  isMale: true,
  weight: 6.5,
});

db.cats.insertOne({
  name: 'Нявчик 2',
  breed: 'British',
  age: 8,
  isMale: true,
  weight: 6.5,
});

db.cats.insertMany([
  {
    name: 'Felix',
    breed: 'Maine Coon',
    weight: 12,
  },
  {
    age: 3,
    isMale: false,
    weight: 4.2,
  },
  {
    name: 'Helicopter',
    isMale: true,
    weight: -15,
  },
  {
    name: 'Vas`ka',
  },
  {
    name: 'Мілка',
    breed: 'Persian',
    age: 3,
    isMale: false,
    weight: 3,
  },
]);

/*
  Read:
    Знайти всіх котиків, які:
      - мають породу - 'British'
      - віком більше ніж > 7 років та чоловічої статі
      - масою меншою або рівною 6 або без даних про породу
*/

db.cats.find({
  breed: 'British',
});

db.cats.find({
  isMale: true,
  age: {
    $gt: 7,
  },
});

db.cats.find({
  $or: [
    {
      weight: {
        $lte: 6,
      },
    },
    {
      breed: { $exists: false },
    },
  ],
});

/*
  Update:
    - всім котам породи 'Maine Coon' встановити масу 8 кг
    - всім котам без статі встановити стать кішки
*/

db.cats.updateMany({ breed: 'Maine Coon' }, { $set: { weight: 8 } });
db.cats.updateMany({ isMale: { $exists: false } }, { $set: { isMale: false } });

/*
  Delete
    видалити кота з ім'ям 'Vas`ka'
    видалити всіх котів, з масою менше 0
    видалити всіх котів у яких немає даних про масу або про вік
*/

db.cats.deleteOne({name: 'Vas`ka'});

db.cats.deleteMany({weight: {$lt: 0}});

db.cats.find({$or: [
  {weight: {$exists: false}},
  {age: {$exists: false} }
]});


db.cats.deleteMany({$or: [
  {weight: {$exists: false}},
  {age: {$exists: false} }
]});