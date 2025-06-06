const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Connection done to DB successfully');
});

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/tours-simple.json`,
    'utf-8',
  ),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create([...tours]);
    console.log('Data successfully loaded into DB');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted from DB');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
