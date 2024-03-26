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
  birthday: new Date(1990,5,15),
  address: {
    city: 'Zaporizhzhia',
    country: 'Ukraine',
  }
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
    phoneNumber: '+380123456897'
  }
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
        street: 'Klasna 15'
      },
      {
        city: 'Zaporizhzhia',
        country: 'Ukraine',
        district: 'Kichkas',
        street: 'Klasna 17'
      },
    ]
  },
  {
    email: 'user3@gmail.com'
  }
]);
