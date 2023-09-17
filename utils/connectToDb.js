const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    const isConnectedToDb = await mongoose.connect(
      process.env.DB_URI || 'mongodb://127.0.0.1:27017/bitfilmsdb',
    );

    if (isConnectedToDb) {
      console.log('Подключение к БД успешно.');
    }
  } catch (e) {
    console.log(`Не удалось подключиться к БД, Ошибка :${e}`);
  }
};

module.exports = { connectToDb };
