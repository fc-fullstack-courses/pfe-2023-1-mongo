// mongodb+srv://admin:admin@cluster0.tskuxah.mongodb.net/firstDb

// запуск виділених команд - ctrl + alt + s

// Create - вставка записів
// один запис
db.users.insertOne({
  firstName: 'First',
  lastName: 'User',
  email: 'user@user.com',
  isMale: true,
  height: 1.91,
  birthday: new Date(1990, 5, 15),
  address: {
    city: 'Zaporizhzhia',
    country: 'Ukraine',
  },
});

db.users.insertOne({
  fullName: 'Test User',
  gender: 'male',
  height: 1.67,
  weight: 85,
  contacts: {
    address: {
      city: 'Zaporizhzhia',
      country: 'Ukraine',
    },
    email: 'user2@gmail.com',
    phoneNumber: '+380123456897',
  },
});

db.users.insertOne({});

// вставка багатьох записів
db.users.insertMany([
  {
    fullName: 'Test User 2',
    weight: 85,
    deliveryAdresses: [
      {
        city: 'Zaporizhzhia',
        country: 'Ukraine',
        district: 'Kichkas',
        street: 'Klasna 15',
      },
      {
        city: 'Zaporizhzhia',
        country: 'Ukraine',
        district: 'Kichkas',
        street: 'Klasna 17',
      },
    ],
  },
  {
    email: 'user3@gmail.com',
  },
]);

db.inventory.insertMany([
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A',
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
  },
]);

// Read - отримання записів

// знайти всі записи
// SELECT * FROM inventory
db.inventory.find();

/*
db.collection.find( query, projection, options );
  query - об'єкт фільтрації запиту
  projection -  об'єкт списка виборки
  options - інші налаштуваня
*/

// SELECT * FROM inventory WHERE status = 'D';
db.inventory.find({
  status: 'D',
});

// SELECT * FROM inventory WHERE qty < 60;
db.inventory.find({
  qty: { $lt: 60 },
});

// SELECT * FROM inventory WHERE qty >= 50 AND status = 'D'
// v1 
db.inventory.find({
  qty: { $gte: 50 },
  status : 'D'
});

// v2
db.inventory.find({
  $and: [ {status: 'D'}, {qty: { $gte: 50 }} ]
});

// SELECT * FROM inventory WHERE qty >= 50 OR status = 'D'
db.inventory.find({
  $or: [{qty: {$gte: 50}}, {status: 'D'}]
});

// SELECT * FROM inventory WHERE qty >= 50 OR (status = 'D' AND item = 'journal')
db.inventory.find({
  $or: [{qty: {$gte: 50}}, {status: 'D', item: 'journal' }]
});

// звертання до властивостей об'єкта
// SELECT * FROM inventory FROM size.uom = 'cm';
db.inventory.find({
  "size.uom": 'cm'
});

// всі записи у яких існує певне поле
// всі користувачі з полем email
db.users.find({
  email: { $exists: true }
});
