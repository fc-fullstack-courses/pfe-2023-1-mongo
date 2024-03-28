// 1 Створення коллекції зі схемою валідації
db.createCollection('cars', {
  validator: {
    // структура документа в коллекції
    $jsonSchema: {
      // тип даних записа
      bsonType: "object",
      // масив назв полів, які є обов'язковими для об'єкта
      required: ['model', 'price', 'manufacturer'],
      // властивості нашого документа, які ми хочемо валідувати
      properties: {
        // валідаційна схема для властивості з конкретною назвою
        model: {
          bsonType: 'string',
          // description: 'model must be string'
        },
        yearOfMaking: {
          bsonType: 'int'
        },
        isUsed: {
          bsonType: 'bool'
        },
        price: {
          bsonType: 'number'
        },
        manufacturer: {
          bsonType: 'object',
          required: ['name'],
          // description: 'manufacturer must be object with name string property ',
          properties: {
            name: {
              bsonType: 'string'
            }
          }
        },
        wheels: {
          bsonType: 'array',
          // валідація вмісту масиву
          items: {
            bsonType: 'object',
            properties: {
              size: {
                bsonType: 'string'
              },
              manufacturer: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  },
  // validationLevel: 'strict',
  // validationAction: 'error'
});

// додавання або зміна валідаційної схеми для існуючої коллекції
db.runCommand({
  // хочемо модифікувати таблицю з невною назвою
  collMod: 'cars',
  validator: {
    // структура документа в коллекції
    $jsonSchema: {
      // тип даних записа
      bsonType: "object",
      // масив назв полів, які є обов'язковими для об'єкта
      required: ['model', 'price', 'manufacturer'],
      // властивості нашого документа, які ми хочемо валідувати
      properties: {
        // валідаційна схема для властивості з конкретною назвою
        model: {
          bsonType: 'string',
          // опис який видасть при помилці, пов'язаній з полем
          description: 'model must be not empty string with english letters',
          // схема регулярки
          pattern: '[A-Za-z ]{1,}'
        },
        yearOfMaking: {
          bsonType: 'int',
          // мінімальне значення числа
          minimum: 1900,
          // иаксимальне значення числа
          maximum: 2500,
        },
        isUsed: {
          bsonType: 'bool'
        },
        price: {
          bsonType: 'number'
        },
        manufacturer: {
          bsonType: 'object',
          required: ['name'],
          description: 'manufacturer must be object with name string property ',
          properties: {
            name: {
              bsonType: 'string'
            }
          }
        },
        wheels: {
          bsonType: 'array',
          // валідація вмісту масиву
          // змушує елементи масиву бути унікальними
          uniqueItems: true,
          items: {
            bsonType: 'object',
            properties: {
              size: {
                bsonType: 'string'
              },
              manufacturer: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  },
});

// 1 нормальна вставка
db.cars.insertOne({
  model: 'Land Cruser',
  yearOfMaking: 2016,
  price: 350000,
  manufacturer: {
    name: 'Toyota',
    email: 'toyota@corp.com'
  },
  wheels: [
    {
      size: 'medium'
    },
    {
      size: 'medium'
    },
    {
      size: 'medium'
    },
    {
      size: 'medium'
    },
  ]
});

// 2 ненормальна вставка
db.cars.insertOne({
  model: 'Camry',
  yearOfMaking: 2012,
  price: 70000,
});