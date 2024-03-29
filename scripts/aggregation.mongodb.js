db.createCollection('manufacturers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
        },
        address: {
          bsonType: 'object',
          required: ['country', 'city'],
        },
      },
    },
  },
});

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'price', 'quantity', 'manufacturerId'],
      properties: {
        name: {
          bsonType: 'string',
        },
        price: {
          bsonType: 'number',
        },
        quantity: {
          bsonType: 'int',
        },
        manufacturerId: {
          bsonType: 'objectId',
        },
      },
    },
  },
});

db.manufacturers.insertMany([
  {
    name: 'Apple',
    address: {
      country: 'USA',
      city: 'Los Angeles',
    },
  },
  {
    name: 'Manufacturer 2',
  },
  {
    name: 'Manufacturer 3',
  },
  {
    name: 'Xiaomi',
    address: {
      country: 'China',
      city: 'Shanghai',
    },
  },
]);

db.products.insertMany([
  {
    name: 'iPhone ABC',
    price: 10000000,
    quantity: 15,
    manufacturerId: new ObjectId('66070159821f6a4b480889c9'),
  },
  {
    name: 'iPhone ABC - Extra',
    price: 20000000,
    quantity: 14,
    manufacturerId: new ObjectId('66070159821f6a4b480889c9'),
  },
  {
    name: 'Lamp',
    price: 150,
    quantity: 6578000,
    manufacturerId: new ObjectId('66070159821f6a4b480889ca'),
  },
  {
    name: 'Powerbabnk V1',
    price: 2500,
    quantity: 65465485,
    manufacturerId: new ObjectId('66070159821f6a4b480889cb'),
  },
  {
    name: 'Powerbabnk V2',
    price: 3500,
    quantity: 10472,
    manufacturerId: new ObjectId('66070159821f6a4b480889cb'),
  },
  {
    name: 'Powerbabnk V3',
    price: 2800,
    quantity: 4552250,
    manufacturerId: new ObjectId('66070159821f6a4b480889cb'),
  },
  {
    name: 'Redmi ABC',
    price: 34000,
    quantity: 455200,
    manufacturerId: new ObjectId('66070159821f6a4b480889cc'),
  },
  {
    name: 'Redmi Note ABC',
    price: 55000,
    quantity: 3688521,
    manufacturerId: new ObjectId('66070159821f6a4b480889cc'),
  },
]);

// отримати дані про продукти та їх виробника
/*
SELECT * FROM products
LEFT JOIN manufacturers ON products.manufacturerId = manufacturers._id
*/
db.products.aggregate([
  // лівий JOIN
  {
    $lookup: {
      from: 'manufacturers', // назва коллекції, яку приєднуємо
      localField: 'manufacturerId', // поле з products
      foreignField: '_id', // назва поля з поєднувальної таблиці
      as: 'manufacturer' // назва поля, в яке буде покладено масив з результатами JOIN-у
    }
  },
  // перетворює масив на конкретне поле. Якщо у масиві більше 1 елементу то зробить 
  // для кожного елементу окремий запис у результаті 
  {
    $unwind: "$manufacturer"
  },
  // прибирає поле або набор полів
  {
    $unset: 'manufacturerId'
    // $unset: ['manufacturerId', 'price']
  }
]);

// порахувати кількість товарів у кожного виробника і дані про виробника
db.products.aggregate([
  {
    $lookup: {
      from: 'manufacturers',
      localField: 'manufacturerId',
      foreignField: '_id',
      as: 'manufacturer'
    }
  },
  {
    $unwind: "$manufacturer"
  },
  // аналог GROUP BY x
  {
    $group: {
      _id: '$manufacturer.name', // те, по чому буде групуватися (х)
      // додаткові поля які використовують агрегаті акомулятори
      productsNumber: { 
        $count: {} // з монги 5 версіі і вище
      },
      productsNumberOld: {
        $sum: 1
      }
    }
  }
]);

/*
  $match - фільтраційние етап у агрегації
  $sort - сортувальний
  $skip - аналог OFFSET
  $limit -  аналог LIMIT
*/

/*
  зробити коллекції працівників і компаній

  отримати всі компанії з даними про їх працівників
  порахувати всіх працівників: 
    - всіх компаній
    - * конкретної компанії
*/