db.cats.find({age: 3}).explain('executionStats');

db.cats.find({ _id: ObjectId('6605958d67408369315f5f3e')}).explain('executionStats');

// створення індексу
// 1 - сортування за зростанням
// -1 - сортування за спаданням
db.cats.createIndex({ age : 1 });

// подивитися на індекси
db.cats.getIndexes();

// видалення індексів
db.cats.dropIndex({age : 1 });

// створення унікального індексу
db.users.createIndex({email: 1}, {unique: true});

db.users.insertMany([
  {email: 'test@test.test'},
  {email: 'test@test.test'}
]);
